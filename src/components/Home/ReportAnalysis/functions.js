// Poso Reserved

import React from "react";
import { set } from "object-path-immutable";
import _get from "lodash.get";
import _orderBy from "lodash.orderby";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

// Utils
import { _roundNumber } from "../../../utils";

// Lib
import { Constants, Functions } from "../../../lib";
import dayjs from "dayjs";

// const DELIVERY_TYPES = {
//   inStore: {
//     label: (
//       <div className={Style.tab}>
//         <DineInIcon className={Style.dineInIcon} /> Dine In
//       </div>
//     ),
//   },
//   pickUp: {
//     label: (
//       <div className={Style.tab}>
//         <LunchBagIcon className={Style.lunchBagIcon} />
//         Take Out
//       </div>
//     ),
//   },
//   deliver: {
//     label: (
//       <div className={Style.tab}>
//         <DeliverIcon className={Style.dineInIcon} />
//         Delivery
//       </div>
//     ),
//   },
// };

const _addAllOrders = ({ byDeliveryType = {} }) =>
  Object.keys(byDeliveryType).reduce(
    (result, deliveryTypeId) => {
      const {
        subTotal = 0,
        subTotalPlusTax = 0,
        totalDeliverFee = 0,
        totalItemsCount = 0,
        totalOrdersCount = 0,
        totalTipAmount = 0,
        totalMerchantFee = 0,
      } = byDeliveryType[deliveryTypeId];
      return {
        subTotal: result.subTotal + subTotal,
        subTotalPlusTax: result.subTotalPlusTax + subTotalPlusTax,
        totalDeliverFee: result.totalDeliverFee + totalDeliverFee,
        totalItemsCount: result.totalItemsCount + totalItemsCount,
        totalMerchantFee: result.totalMerchantFee + totalMerchantFee,
        totalOrdersCount: result.totalOrdersCount + totalOrdersCount,
        totalTipAmount: result.totalTipAmount + totalTipAmount,
      };
    },
    {
      subTotal: 0,
      subTotalPlusTax: 0,
      totalDeliverFee: 0,
      totalItemsCount: 0,
      totalMerchantFee: 0,
      totalOrdersCount: 0,
      totalTipAmount: 0,
    }
  );

const _createReport = ({ pastOrders = {} }) => {
  const { OrderMathFuncs } = Functions;
  const { _calSubTotalOfOrder, _calcSubTotalPlusTax, _calcTotalItemsCount } =
    OrderMathFuncs;
  const { QUICK_REPORT_TEMPLATE } = Constants;
  const byDeliveryType = Object.values(pastOrders).reduce(
    (report, orderDetails) => {
      const {
        merchantFees = {},
        orderDeliveryTypeID = "inStore",
        orderItems = {},
        tipAmount = 0,
        totalDeliverFee: deliverFeeAmount = 0,
        store_front = {},
      } = orderDetails;
      const { fees_list = {} } = store_front;
      const { convenience = {} } = fees_list;
      const { monetaryAmount: total_convenience_fee = 0 } = convenience;
      const {
        subTotal = 0,
        subTotalPlusTax = 0,
        totalDeliverFee = 0,
        totalItemsCount = 0,
        totalMerchantFee = 0,
        totalOrdersCount = 0,
        totalTipAmount = 0,
      } = report[orderDeliveryTypeID];

      const { totalFee = 0 } = merchantFees;
      return set(report, orderDeliveryTypeID, {
        subTotal:
          subTotal +
          _calSubTotalOfOrder({ orderItems }) +
          total_convenience_fee,
        subTotalPlusTax:
          subTotalPlusTax +
          _calcSubTotalPlusTax({ orderDetails }) +
          total_convenience_fee,
        totalDeliverFee: (totalDeliverFee || 0) + deliverFeeAmount,
        totalItemsCount: totalItemsCount + _calcTotalItemsCount({ orderItems }),
        totalOrdersCount: totalOrdersCount + 1,
        totalTipAmount: totalTipAmount + tipAmount,
        totalMerchantFee: totalMerchantFee + totalFee,
      });
    },
    QUICK_REPORT_TEMPLATE
  );
  return {
    allOrders: _addAllOrders({ byDeliveryType }),
    byDeliveryType,
  };
};

const _convertRowValueToString = ({ field_id, value }) => {
  switch (field_id) {
    case "net_sales":
    case "net_total":
    case "net_total_plus_tips":
    case "salesTax":
    case "subTotal":
    case "totalDeliverFee":
    case "totalTipAmount":
      return `${Functions.Math.formatVND(value)} VNĐ`;
    case "merchant_fee":
      return `(${Functions.Math.formatVND(value)})`;
    default:
      return value;
  }
};

const _getDataRowValue = ({ field_id, report }) => {
  switch (field_id) {
    case "merchant_fee": {
      const { totalMerchantFee = 0 } = report;
      return parseFloat(totalMerchantFee);
    }
    case "net_sales": {
      const { subTotal, totalMerchantFee = 0 } = report;
      return parseFloat(subTotal) - parseFloat(totalMerchantFee);
    }
    case "net_total": {
      return (
        _getDataRowValue({ field_id: "subTotal", report }) +
        _getDataRowValue({ field_id: "salesTax", report }) -
        _getDataRowValue({ field_id: "merchant_fee", report })
      );
    }
    case "net_total_plus_tips": {
      return (
        _getDataRowValue({ field_id: "net_total", report }) +
        _getDataRowValue({ field_id: "totalTipAmount", report })
      );
    }
    case "salesTax": {
      const { subTotal, subTotalPlusTax } = report;
      // return parseFloat(subTotalPlusTax) - parseFloat(subTotal);
      return 0;
    }
    case "subTotal": {
      const { subTotal } = report;
      return parseFloat(subTotal);
    }
    case "totalDeliverFee":
    case "totalTipAmount": {
      const result = _get(report, field_id) || 0;
      if (parseFloat(result) === 0 || isNaN(result)) return 0;
      return result;
    }
    default:
      return _get(report, field_id) || 0;
  }
};

// --------------------------------------------------
// Find top 5 selling items in past orders

const _findtopItems = ({ pastOrders = {} }) => {
  const order_items = Object.values(pastOrders).reduce((items, order) => {
    const { orderItems = {} } = order;
    Object.values(orderItems).forEach((item) => {
      const {
        itemID,
        quantity,
        itemSimpleDescription: { itemKitchenChitName, itemName },
      } = item;
      items[itemID]
        ? (items[itemID].quantity += quantity)
        : (items[itemID] = { itemID, itemKitchenChitName, quantity, itemName });
    });
    return items;
  }, {});
  return _orderBy(Object.values(order_items), "quantity", "desc").slice(0, 5);
};

const _getTimeRangeFromSelected = (range) => {
  const now = dayjs();
  switch (range) {
    case "Hôm nay":
      return {
        startAt: now.startOf("day").toISOString(),
        endAt: now.endOf("day").toISOString(),
      };
    case "Hôm qua":
      return {
        startAt: now.subtract(1, "day").startOf("day").toISOString(),
        endAt: now.subtract(1, "day").endOf("day").toISOString(),
      };
    case "7 ngày qua":
      return {
        startAt: now.subtract(6, "day").startOf("day").toISOString(),
        endAt: now.endOf("day").toISOString(),
      };
    case "Tháng này":
      return {
        startAt: now.startOf("month").toISOString(),
        endAt: now.endOf("month").toISOString(),
      };
    case "Tháng trước":
      const lastMonth = now.subtract(1, "month");
      return {
        startAt: lastMonth.startOf("month").toISOString(),
        endAt: lastMonth.endOf("month").toISOString(),
      };
    default:
      return {
        startAt: now.startOf("day").toISOString(),
        endAt: now.endOf("day").toISOString(),
      };
  }
};

const filterBillsByTime = (bills, startAt, endAt) => {
  return bills.filter((bill) => {
    const billTime = dayjs(bill.timeStamp);
    return billTime.isAfter(startAt) && billTime.isBefore(endAt);
  });
};

/**
 * Tạo dữ liệu biểu đồ dựa trên danh sách hóa đơn và loại bộ lọc thời gian.
 * @param {Array} bills - Mảng các hóa đơn.
 * @param {string} filterType - Loại bộ lọc ('Hôm nay', 'Hôm qua', '7 ngày qua'...).
 * @returns {Array} - Mảng dữ liệu đã được định dạng cho gifted-charts.
 */
const getRevenueData = (bills, filterType) => {
  const now = dayjs();
  let startDate, endDate, template, timeUnit, timeFormat;
  let initialScrollIndex = 0;
  switch (filterType) {
    case "Hôm nay":
      startDate = now.startOf("day");
      endDate = now.endOf("day");
      timeUnit = "hour";
      timeFormat = "H";
      initialScrollIndex = now.hour();

      template = Array.from({ length: 24 }, (_, i) => ({
        value: 0,
        label: `${i}h`,
      }));
      break;

    case "Hôm qua":
      startDate = now.subtract(1, "day").startOf("day");
      endDate = now.subtract(1, "day").endOf("day");
      timeUnit = "hour";
      timeFormat = "H";
      initialScrollIndex = 0
      template = Array.from({ length: 24 }, (_, i) => ({
        value: 0,
        label: `${i}h`,
      }));
      break;

    case "7 ngày qua":
      startDate = now.subtract(6, "days").startOf("day");
      endDate = now.endOf("day");
      timeUnit = "day";
      timeFormat = "DD/MM";
      template = Array.from({ length: 7 }, (_, i) => ({
        value: 0,
        label: now.subtract(6 - i, "days").format("DD/MM"),
      }));
      initialScrollIndex = 6;
      break;

    case "Tháng này":
      startDate = now.startOf("month");
      endDate = now.endOf("month");
      timeUnit = "day";
      timeFormat = "DD";
      template = Array.from({ length: now.daysInMonth() }, (_, i) => ({
        value: 0,
        label: dayjs(startDate).add(i, "day").format("DD"),
      }));
      initialScrollIndex = now.date() - 1;
      break;

    case "Tháng trước":
      const lastMonth = now.subtract(1, "month");
      startDate = lastMonth.startOf("month");
      endDate = lastMonth.endOf("month");
      timeUnit = "day";
      timeFormat = "DD";
      initialScrollIndex = 0;
      template = Array.from({ length: lastMonth.daysInMonth() }, (_, i) => ({
        value: 0,
        label: dayjs(startDate).add(i, "day").format("DD"),
      }));
      break;

    default:
      return [];
  }

  const filteredBills = bills.filter((bill) =>
    dayjs(bill.timeStamp).isBetween(startDate, endDate, null, "[]")
  );
  if (filteredBills.length === 0) {
    return [];
  }
  filteredBills.forEach((bill) => {
    let key;
    if (timeUnit === "hour") {
      key = dayjs(bill.timeStamp).hour();
    } else {
      key = dayjs(bill.timeStamp).format(timeFormat);
    }

    const templateEntry =
      timeUnit === "hour"
        ? template[key]
        : template.find((t) => t.label === key);

    if (templateEntry) {
      templateEntry.value += bill.total || 0;
    }
  });

  const data = template.map((item) => ({
    ...item,
    frontColor: "#006DFF",
    gradientColor: "#009FFF",
  }));
  return {
    chartData: data,
    initialScrollIndex,
  };  
};
const getCartOverview = (filteredBills) => {
  let totalRevenue = 0;
  let totalTransactions = filteredBills.length || 0;

  filteredBills.forEach((bill) => {
    const billTotal = bill.total || 0;
    const transactions = String(bill.isPaid) === "true" ? 1 : 0;
    totalTransactions += transactions;
    totalRevenue += billTotal;
  });

  return {
    totalRevenue,
    totalTransactions,
  };
};
const getTopSellingItems = (filteredBills) => {
  const itemMap = {};

  filteredBills.forEach((bill) => {
    bill.orderItems.forEach((item) => {
      const { itemID, itemName, quantity, itemPrice } = item;
      if (itemMap[itemID]) {
        itemMap[itemID].quantity += quantity;
        itemMap[itemID].revenue += itemPrice * quantity;
      } else {
        itemMap[itemID] = {
          itemID,
          itemName,
          quantity,
          revenue: itemPrice * quantity,
        };
      }
    });
  });

  return Object.values(itemMap)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
};

const getTotalSoldQuantity = (filteredBills) => {
  return filteredBills.reduce((total, bill) => {
    return (
      total + bill.orderItems.reduce((sum, item) => sum + item.quantity, 0)
    );
  }, 0);
};
const DATE_RANGES = [
  "Hôm nay",
  "Hôm qua",
  "7 ngày qua",
  "Tháng này",
  "Tháng trước",
];
export {
  // DELIVERY_TYPES,
  DATE_RANGES,
  _convertRowValueToString,
  _createReport,
  _findtopItems,
  _getDataRowValue,
  _getTimeRangeFromSelected,

  // hàm xử lý dữ liệu doanh thu
  filterBillsByTime,
  getRevenueData,
  getCartOverview,
  getTopSellingItems,
  getTotalSoldQuantity,
};
