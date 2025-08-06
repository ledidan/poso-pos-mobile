const _generateOrderID = () =>
  String(Math.floor(100000 + Math.random() * 900000)) +
  String.fromCharCode(97 + Math.floor(Math.random() * 26));

const _initializeDetailsOfItemInCart = ({
  itemID = "",
  itemInfo = {},
  isNewOrder = false,
}) => {
  const {
    itemIsOnSale = {},
    itemKitchenChitName = "",
    itemName,
    itemPrice = "",
    itemNote = "",
    itemSaleRate = 0,
  } = itemInfo;
  const detailsOfItemInCart = {
    itemID,
    itemSimpleDescription: {
      itemKitchenChitName,
      itemName,
      itemPrice,
      itemNote,
    },
    quantity: itemInfo.quantity || 1,
    isNewOrder,
  };
  const saleRate = isNaN(parseFloat(itemSaleRate))
    ? 0
    : parseFloat(itemSaleRate);
  const isItemOnSale = Boolean(itemIsOnSale.true) && saleRate > 0;
  return !isItemOnSale
    ? detailsOfItemInCart
    : {
        ...detailsOfItemInCart,
        itemIsOnSale: isItemOnSale,
        itemSaleRate: saleRate,
      };
};

const _syncCurrentCartWithCartOrdered = ({
  cart,
  cartOrdered,
  shopID,
  orderID,
}) => {
  const cartOrderedKey = `${shopID}_${orderID}`;
  const cartOrderedData = cartOrdered?.[cartOrderedKey];

  const previousItems = cartOrderedData?.orderItems || [];

  const merged = [...previousItems, ...Object.values(cart)];

  const converted = Object.values(merged).map((cartItem) => {
    return {
      ...cartItem,
      isNewOrder: false,
    };
  });

  return converted;
};
export {
  _generateOrderID,
  _initializeDetailsOfItemInCart,
  _syncCurrentCartWithCartOrdered,
};
