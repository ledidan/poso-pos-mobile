// Poso Reserved

import API_PATHS from "../API_Paths";
import axios from "axios";

// ---------------------------------------------------------------
// Create a unique id for the customer

const CreateUniqueIDForCustomer = () =>
  new Promise((resolve, reject) => {
    axios
      .get(API_PATHS.CREATE_UNIQUE_ID_FOR_CUSTOMER)
      .then(({ data }) => {
        const { customerProfile, uuid } = data;
        resolve({ customerProfile, uuid });
      })
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the cart of the customer at a particular shop

const GetCustomerCart = (params) =>
  new Promise((resolve, reject) => {
    if (!params.shopID || !params.uuid)
      return reject("(GetCustomerCart) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_CUSTOMER_CART, { params })
      .then(({ data }) =>
        resolve({ cart: typeof data === "string" ? JSON.parse(data) : data })
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the customer's past orders at a particular shop

const GetCustomerPastOrdersAtShop = (params) =>
  new Promise((resolve, reject) => {
    if (!params.shopID || !params.uuid)
      return reject(
        "(GetCustomerPastOrdersAtShop) Parameters are not sufficient."
      );
    axios
      .get(API_PATHS.GET_CUSTOMER_PAST_ORDERS_AT_SHOP, { params })
      .then(({ data }) =>
        resolve({
          pastOrdersAtShop: typeof data === "string" ? JSON.parse(data) : data,
        })
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the customer's stored payment methods (i.e., cards)

const GetCustomerPaymentMethods = (params) =>
  new Promise((resolve, reject) => {
    if (!params.stripeCustomerID)
      return reject(
        "(GetCustomerPaymentMethods) Parameters are not sufficient."
      );
    axios
      .get(API_PATHS.GET_CUSTOMER_PAYMENT_METHODS, { params })
      .then(({ data }) =>
        resolve({
          paymentMethods: typeof data === "string" ? JSON.parse(data) : data,
        })
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the profile of customer

const GetCustomerProfile = (params) =>
  new Promise((resolve, reject) => {
    if (!params.uuid)
      return reject("(GetCustomerProfile) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_CUSTOMER_PROFILE, { params })
      .then(({ data }) => {
        const { customerProfile, success } = data;
        resolve({ customerProfile, success });
      })
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Get the full image of a menu item

const GetMenuItemFullImage = (params) =>
  new Promise((resolve, reject) => {
    if (!params.itemID || !params.shopID)
      return reject("(GetMenuItemFullImage) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_MENU_ITEM_FULL_IMAGE, { params })
      .then(({ data }) => resolve({ imageURL: data.imageURL || "" }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the menus of a shop using its unique id

const GetMenusForCustomer = ({ shopID }) =>
  new Promise((resolve, reject) => {
    if (!shopID)
      return reject("(GetMenusForCustomer) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_MENUS_FOR_CUSTOMER, { params: { shopID } })
      .then(({ data }) => resolve({ customerMenus: data.customerMenus || {} }))
      .catch((e) => reject(e));
  });

export default {
  CreateUniqueIDForCustomer,
  GetCustomerCart,
  GetCustomerPastOrdersAtShop,
  GetCustomerPaymentMethods,
  GetCustomerProfile,
  GetMenuItemFullImage,
  GetMenusForCustomer,
};
