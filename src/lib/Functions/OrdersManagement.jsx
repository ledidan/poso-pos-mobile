/* eslint-disable no-throw-literal */
// Poso Reserved

import dayjs from "dayjs";
import DateTime from "./DateTime";

import {
  _createDeliveryInfo,
  _createHeader,
  _createOrderQuickInfo,
  _createOrderItems,
  _getPrintCommands,
  _repeatCommand,
} from "./Printer";

// Constants
const DEFAULT_TIMESTAMP = "1980-01-01T00:00:00.000Z";

const RankActiveOrders = (activeOrders = {}) => {
  let rankedOrders = {};
  Object.keys(activeOrders)
    .sort((a, b) => {
      const obj1 = activeOrders[a];
      const obj2 = activeOrders[b];
      const timeStamp1 = obj1.timeStamp || DEFAULT_TIMESTAMP;
      const timeStamp2 = obj2.timeStamp || DEFAULT_TIMESTAMP;
      return dayjs(timeStamp2).diff(dayjs(timeStamp1));
      // const status1_score = ORDER_STATUS_SCORES[obj1.status || "active"];
      // const status2_score = ORDER_STATUS_SCORES[obj2.status || "active"];
      // if (status1_score === status2_score) {
      //   const timeStamp1 = obj1.timeStamp || DEFAULT_TIMESTAMP;
      //   const timeStamp2 = obj2.timeStamp || DEFAULT_TIMESTAMP;
      //   return differenceInMinutes(timeStamp2, timeStamp1);
      // }
      // return status2_score - status1_score;
    })
    .forEach((key) => (rankedOrders[key] = activeOrders[key]));
  return rankedOrders;
};

const RankPastOrders = (pastOrders = {}) => {
  let rankedPastOrders = {};
  Object.keys(pastOrders)
    .sort((a, b) => {
      const obj1 = pastOrders[a];
      const obj2 = pastOrders[b];
      const closedAt1 = obj1.closedAt || DEFAULT_TIMESTAMP;
      const closedAt2 = obj2.closedAt || DEFAULT_TIMESTAMP;
      return dayjs(closedAt2).diff(dayjs(closedAt1));
    })
    .forEach((key) => {
      rankedPastOrders[key] = pastOrders[key];
    });
  return rankedPastOrders;
};

const _checkPrinterBeforePrintOrder = ({ printerName }) => {
  if (!window.qz.websocket.isActive())
    return { errorCode: "printServerNotConnected", success: false };
  window.qz.printers
    .find(printerName)
    .catch(() => ({ errorCode: "printerNotConnected", success: false }));
  return { success: true };
};

const _constructPrintFormForOrder = ({
  isPrintingTestOrder = false,
  orderID,
  orderInfo,
  printerBrand = "epson",
  receivedTimestamp,
}) => {
  const printCommands = _getPrintCommands({ printerBrand });
  const header = _createHeader({
    ...orderInfo,
    printCommands,
    isPrintingTestOrder,
  });
  return header.concat(
    _createDeliveryInfo({ ...orderInfo, printCommands }),
    _createOrderQuickInfo({
      orderID,
      ...orderInfo,
      printCommands,
      receivedTimestamp,
    }),
    _createOrderItems({ ...orderInfo, printCommands }),
    _repeatCommand(printCommands.lineBreak, 4),
    printCommands.partialCut
  );
};

const _printOrder = ({
  isPrintingTestOrder = false,
  qzConfigForPrinter,
  orderID = "",
  orderInfo,
  printerBrand = "epson",
  printerName = "",
  shopTimeZone,
}) => {
  try {
    const { errorCode, success } = _checkPrinterBeforePrintOrder({
      printerName,
    });
    if (!success) throw errorCode;
    else {
      if (!printerName) throw "Printer's name is required";
      else if (!orderID) throw "Order ID is required";
      else {
        const { timeStamp } = orderInfo;
        const { local_date, local_time } = DateTime._convertUTCTimestampToLocalTime(
          {
          localTimeZone: shopTimeZone,
          timeStamp,
        });
        const printForm = _constructPrintFormForOrder({
          isPrintingTestOrder,
          orderID,
          orderInfo,
          printerBrand,
          receivedTimestamp: `${local_date} ${local_time}`,
        });
        window.qz.print(qzConfigForPrinter, printForm).catch((error) => {
          throw error;
        });
      }
    }
  } catch (e) {
    throw e;
  }
};

export default {
  _printOrder,
  RankActiveOrders,
  RankPastOrders,
};
