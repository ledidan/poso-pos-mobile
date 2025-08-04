const getOrderPayload = ({ order, cart, total, note, timeStamp }) => {
  const orderItems = cart.map((item) => ({
    itemID: item.itemID,
    quantity: item.quantity,
    itemSimpleDescription: {
      itemName: item.itemSimpleDescription.itemName,
      itemPrice: item.itemSimpleDescription.itemPrice,
    },
  }));

  const commonData = {
    orderItems,
    status: "active",
    total,
    timeStamp,
    customerInstruction: note,
    orderFrom: "pos",
  };

  if (order.orderDeliveryTypeID === "inStore") {
    return {
      ...commonData,
      orderDeliveryTypeID: "inStore",
      tableID: order.tableID,
      tableName: order.tableName,
      tableStatus: "active",
      customerName: `Khách tại bàn ${order.tableName}`,
    };
  }

  return {
    ...commonData,
    orderDeliveryTypeID: "pickUp",
    customerName: order.customerName || "Khách mang về",
  };
};

export default { getOrderPayload };
