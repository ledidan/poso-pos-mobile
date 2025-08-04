// Poso Reserved

import React from "react";

// Icons
// import { DeliverIcon, DineInIcon, LunchBagIcon } from "../../assets/Icons";

// import STRIPE from "./Stripe";
import {
  AVERAGE_PREPARATION_TIMES,
  BUTI_EMAIL_ADDRESSES,
  CHECKING_ACCOUNT_FIELDS,
  COUPON_INFO_SECTION,
  CUSTOMER_TIPPING_OPTIONS,
  QUICK_REPORT_TEMPLATE,
  MERCHANT_GET_PAID_FORM,
  NEW_GROUP_AVAILABILITY,
  NEW_GROUP_FIELDS,
  NEW_ITEM_FIELDS,
  NEW_MENU_FIELDS,
  NEW_MODIFIER_FIELDS,
  NEW_MODIFIER_GROUP_FIELDS,
  NEW_PAYMENT_CARD_FIELDS,
  OPPORTUNITIES,
  OWNER_INFO_FIELDS,
  SALES_REPORT_FILTER_OPTIONS,
  SHOP_INFO_SECTIONS,
} from "./Miscellaneous";
import PRINT_COMMANDS from "./PrintCommands";
import REGEX from "./RegEx";

// const ORDER_DELIVERY_TYPES = {
//   inStore: { icon: <DineInIcon />, label: "In Store" },
//   pickUp: { icon: <LunchBagIcon />, label: "Pick Up" },
//   deliver: { icon: <DeliverIcon />, label: "Delivery" },
// };

const DAYS_IN_A_WEEK = {
  "thứ hai": { id: 1 },
  "thứ ba": { id: 2 },
  "thứ tư": { id: 3 },
  "thứ năm": { id: 4 },
  "thứ sáu": { id: 5 },
  "thứ bảy": { id: 6 },
  "chủ nhật": { id: 7 },
};

const TIMEZONE_OBSERVE_DST = {
  "America/New_York": {
    label: "US Eastern",
    description: "EDT / EST",
    utc_offset_minutes: 240,
  },
  "America/Chicago": {
    label: "US Central",
    description: "CDT / CST",
    utc_offset_minutes: 300,
  },
  "America/Denver": {
    label: "US Mountain",
    description: "MDT / MST",
    utc_offset_minutes: 360,
  },
  "America/Los_Angeles": {
    label: "US Pacific",
    description: "PDT / PST",
    utc_offset_minutes: 420,
  },
  "America/Anchorage": {
    label: "Alaska",
    description: "AKST",
    utc_offset_minutes: 480,
  },
};

const DATE_FORMAT = "DD/MM/YYYY";
const DEFAULT_TIMEZONE = "Asia/Ho_Chi_Minh";
const TIME_FORMAT = "hh:mm A";
const TEST_SHOP_IDS = [];
const TIME_RANGE_OPTIONS = {
  today: { label: "today", description: "today" },
  "1d": { label: "1d", description: "yesterday" },
  "1w": { label: "1w", description: "1 week" },
  "4w": { label: "4w", description: "4 weeks" },
  // all: { label: "All", description: "all time" },
};

const PAYMENT_WALLET_OPTIONS = {
  CARD: "CARD",
  PAYMENT_REQUEST: "PAYMENT_REQUEST",
};

const CUSTOMER_REWARD_TYPES = {
  ON_SALE_ITEMS: "Items on Sale",
  COUPONS: "Coupons",
};

const CUSTOMER_REWARD_TYPES_IMG_URLS = {
  ON_SALE_ITEMS: "https://i.imgur.com/MWoheLN.jpg",
  COUPONS: "https://i.imgur.com/oTVRhYM.jpg",
};

const COUPON_TYPES = {
  BUY_ONE_GET_ONE: {
    description: "Select items from the menu to offer buy one, get one on",
    header: "Buy One, Get One",
  },
  DISCOUNT_ON_ORDERS_ABOVE_X: {
    description: "Set a flat discount if the price exceeds an amount $X",
    header: "Discount on orders above $X",
  },
  COMBOS: {
    description: "Create combos on different items from the menu",
    header: "Combos",
    comingSoon: true,
  },
  DISCOUNT_ON_TOTAL_AMOUNT: {
    description: "Set a discount on the total amount of the order",
    header: "Discount on final Order",
    comingSoon: true,
  },
};

const BOGO_CHOICES = {
  sameCategory: {
    label: "Same category",
    example: "Buy one, get one on Burgers",
  },
  differentCategories: {
    label: "Different categories",
    example: "Buy one Burger, get one Side free",
  },
};

export default {
  AVERAGE_PREPARATION_TIMES,
  BOGO_CHOICES,
  BUTI_EMAIL_ADDRESSES,
  CHECKING_ACCOUNT_FIELDS,
  COUPON_INFO_SECTION,
  COUPON_TYPES,
  CUSTOMER_REWARD_TYPES,
  CUSTOMER_REWARD_TYPES_IMG_URLS,
  CUSTOMER_TIPPING_OPTIONS,
  // ORDER_DELIVERY_TYPES,
  DAYS_IN_A_WEEK,
  DATE_FORMAT,
  DEFAULT_TIMEZONE,
  OPPORTUNITIES,
  QUICK_REPORT_TEMPLATE,
  MERCHANT_GET_PAID_FORM,
  NEW_GROUP_AVAILABILITY,
  NEW_GROUP_FIELDS,
  NEW_ITEM_FIELDS,
  NEW_MENU_FIELDS,
  NEW_MODIFIER_FIELDS,
  NEW_MODIFIER_GROUP_FIELDS,
  NEW_PAYMENT_CARD_FIELDS,
  OWNER_INFO_FIELDS,
  PAYMENT_WALLET_OPTIONS,
  PRINT_COMMANDS,
  REGEX,
  SALES_REPORT_FILTER_OPTIONS,
  SHOP_INFO_SECTIONS,
  // STRIPE,
  TEST_SHOP_IDS,
  TIME_FORMAT,
  TIME_RANGE_OPTIONS,
  TIMEZONE_OBSERVE_DST,
};
