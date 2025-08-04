// Poso Reserved

import { _roundNumber } from "../../utils";

////////////////////////////////////////////////////
// Private functions
///////////////////////////////////////////////////

const CalcTotalUnitPriceBeforeTaxForItem = ({ detailsOfItemInCart = {} }) => {
  const { itemIsOnSale = false, itemSaleRate = 0 } = detailsOfItemInCart;
  const { itemSimpleDescription } = detailsOfItemInCart;
  const itemPrice = parseFloat(itemSimpleDescription.itemPrice || 0);
  let totalUnitPriceBeforeTax =
    itemPrice +
    CalcTotalPriceForModifierGroups(detailsOfItemInCart.modifierGroups);
  const totalUnitPriceBeforeTaxWithoutSale = totalUnitPriceBeforeTax;
  if (itemIsOnSale) {
    totalUnitPriceBeforeTax =
      totalUnitPriceBeforeTax * (1 - parseFloat(itemSaleRate) / 100);
  }
  return {
    totalUnitPriceBeforeTaxWithoutSale: _roundNumber(
      totalUnitPriceBeforeTaxWithoutSale
    ),
    totalUnitPriceBeforeTax: _roundNumber(totalUnitPriceBeforeTax),
  };
};

const CalcTotalPriceForModifierGroups = (modifierGroups = {}) => {
  const total = Object.keys(modifierGroups).reduce((sum, modifierGroupID) => {
    const { modifiers } = modifierGroups[modifierGroupID];
    return sum + CalcTotalPriceForModifiers(modifiers);
  }, 0);
  return _roundNumber(total);
};

const CalcTotalPriceForModifiers = (modifiers = {}) => {
  const total = Object.keys(modifiers).reduce((sum, modifierID) => {
    const { modifierPrice } = modifiers[modifierID];
    return sum + parseFloat(modifierPrice || 0);
  }, 0);
  return _roundNumber(total);
};

////////////////////////////////////////////////////
// Public functions
///////////////////////////////////////////////////

const _calcTotalPriceBeforeTaxForItem = ({ detailsOfItemInCart = {} }) => {
  const {
    totalUnitPriceBeforeTax,
    totalUnitPriceBeforeTaxWithoutSale,
  } = CalcTotalUnitPriceBeforeTaxForItem({
    detailsOfItemInCart,
  });
  return {
    totalPriceBeforeTaxWithoutSale: _roundNumber(
      totalUnitPriceBeforeTaxWithoutSale * detailsOfItemInCart.quantity
    ),
    totalPriceBeforeTax: _roundNumber(
      totalUnitPriceBeforeTax * detailsOfItemInCart.quantity
    ),
  };
};

const _calcTotalDiscount = ({ orderItems = {} }) => {
  return Object.values(orderItems).reduce((accumulator, item) => {
    const { itemPrice } = item.itemSimpleDescription;
    const { itemSaleRate, quantity } = item;
    const discount = itemSaleRate
      ? ((itemPrice * itemSaleRate) / 100) * quantity
      : 0;
    return accumulator + discount;
  }, 0);
};

const _calSubTotalOfOrder = ({ orderItems }) => {
  const subTotal = Object.entries(orderItems).reduce((result, entry) => {
    const { totalPriceBeforeTax } = _calcTotalPriceBeforeTaxForItem({
      detailsOfItemInCart: entry[1],
    });
    return result + totalPriceBeforeTax;
  }, 0);
  return _roundNumber(subTotal);
};

const _calcTaxPlusTip = ({ values = [] }) => {
  const sum = values.reduce((acc, val) => acc + parseFloat(val), 0);
  return _roundNumber(sum);
};

const _calcSubTotalPlusTax = ({ orderDetails }) => {
  const { feesForBUTI = {}, tipAmount = 0, totalPriceAfterTax } = orderDetails;
  const totalFeesForBUTI = parseFloat(
    Object.values(feesForBUTI).reduce((total, fee) => {
      return total + parseFloat(fee || 0);
    }, 0)
  );
  return _roundNumber(
    parseFloat(totalPriceAfterTax) - totalFeesForBUTI - parseFloat(tipAmount)
  );
};

const _calcTotalItemsCount = ({ orderItems = {} }) =>
  Object.keys(orderItems).reduce((sum, id) => {
    const { quantity = 1 } = orderItems[id];
    return sum + quantity;
  }, 0);

export default {
  _calcTaxPlusTip,
  _calcTotalDiscount,
  _calSubTotalOfOrder,
  _calcSubTotalPlusTax,
  _calcTotalItemsCount,
  _calcTotalPriceBeforeTaxForItem,
};
