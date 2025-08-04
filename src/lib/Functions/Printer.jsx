// Poso Reserved

// Utils
import { _roundNumber } from "../../utils";

// Lib
import { Constants, Functions } from "../../lib";

const { ORDER_DELIVERY_TYPES, PRINT_COMMANDS } = Constants;

const _createHeader = ({
  customerName,
  orderItems = {},
  printCommands,
  isPrintingTestOrder = false,
}) => {
  const { OrderMathFuncs } = Functions;
  const { _calcTotalItemsCount } = OrderMathFuncs;
  const itemsCount = _calcTotalItemsCount({ orderItems });
  return [
    printCommands.init,
    printCommands.centerAlign,
    printCommands.doubleFontSize,
    printCommands.boldOn,
    "POSO",
    _repeatCommand(printCommands.lineBreak, 1),
    isPrintingTestOrder ? "---- Test Order ----" : "",
    isPrintingTestOrder ? printCommands.lineBreak : "",
    customerName,
    _repeatCommand(printCommands.lineBreak, 1),
    `${itemsCount} sản phẩm`,
    _repeatCommand(printCommands.lineBreak, 1),
  ];
};

const _createDeliveryInfo = ({
  deliveryDetails = {},
  pickUpTime = "",
  printCommands,
  orderDeliveryTypeID = "inStore",
  tableNumber = "",
}) => {
  const { courier } = deliveryDetails;
  const { label = "" } = ORDER_DELIVERY_TYPES[orderDeliveryTypeID] || "";
  let text = "";
  if (orderDeliveryTypeID === "inStore") text = `, Table: ${tableNumber}`;
  else if (orderDeliveryTypeID === "pickUp") text = `, ${pickUpTime}`;
  return [
    `${label}${text}`,
    orderDeliveryTypeID === "deliver" ? printCommands.lineBreak : "",
    orderDeliveryTypeID === "deliver" ? `Courier: ${courier}` : "",
    _repeatCommand(printCommands.lineBreak, 2),
  ];
};

const _createOrderQuickInfo = ({
  orderID,
  printCommands,
  receivedTimestamp,
}) => [
  printCommands.doubleFontSize,
  `Order#: ${orderID}`,
  _repeatCommand(printCommands.lineBreak, 1),
  `${receivedTimestamp}`,
  _repeatCommand(printCommands.lineBreak, 2),
  printCommands.leftAlign,
  printCommands.standardFontSize,
];

const _createOrderItems = ({ orderItems, printCommands }) =>
  Object.values(orderItems).reduce((result, details) => {
    const {
      customerInstruction,
      itemSimpleDescription,
      modifierGroups = {},
      quantity,
    } = details;
    const { itemKitchenChitName = "", itemName } = itemSimpleDescription;
    let item = [
      printCommands.boldOff,
      "------------------------------",
      printCommands.boldOn,
      _repeatCommand(printCommands.lineBreak, 1),
      `(${quantity}x) ${itemKitchenChitName || itemName}`,
      printCommands.boldOff,
    ];
    item = item.concat(_createModifiers({ modifierGroups, printCommands }));
    item = item.concat(
      _createInstruction({ customerInstruction, printCommands })
    );
    return result.concat(
      item.concat(_repeatCommand(printCommands.lineBreak, 1))
    );
  }, []);

const _createInstruction = ({ customerInstruction = "", printCommands }) => {
  if (!customerInstruction) return [];
  return [
    _repeatCommand(printCommands.lineBreak, 2),
    `Guest Note: ${customerInstruction}`,
  ];
};

const _createModifiers = ({ modifierGroups = {}, printCommands }) => {
  if (Object.keys(modifierGroups).length === 0) return [];
  let allModifiers = [];
  Object.values(modifierGroups).forEach((modifierGroupInfo) => {
    const { modifiers } = modifierGroupInfo;
    Object.values(modifiers).forEach((modifierInfo) => {
      const {
        modifierKitchenChitName = "",
        modifierName,
        modifierPrice = 0,
      } = modifierInfo;
      allModifiers = allModifiers.concat(
        `${modifierKitchenChitName || modifierName} ($${_roundNumber(
          modifierPrice
        )})`
      );
    });
  });
  return [_repeatCommand(printCommands.lineBreak, 1), allModifiers.join(", ")];
};

const _getPrintCommands = ({ printerBrand = "epson" }) => {
  switch (printerBrand) {
    case "star":
      return PRINT_COMMANDS.STAR;
    case "epson":
    default:
      return PRINT_COMMANDS.EPSON;
  }
};

const _repeatCommand = (command = "", count = 1) => command.repeat(count);

export {
  _createDeliveryInfo,
  _createHeader,
  _createOrderQuickInfo,
  _createOrderItems,
  _getPrintCommands,
  _repeatCommand,
};
