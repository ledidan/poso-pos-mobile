// Poso Reserved

import API_PATHS from "../API_Paths";
import axios from "axios";
import * as immutable from "object-path-immutable";

// -----------------------------------------------------------------------
// Move an order to the customer's past orders

const AddOrderToCustomerPastOrders = (params) =>
  new Promise((resolve, reject) => {
    const { orderID, orderPreviewDetails, shopID, uuid } = params;
    if (!orderPreviewDetails || !orderID || !shopID || !uuid)
      return reject(
        "(AddOrderToCustomerPastOrders) Parameters are not sufficient."
      );
    axios
      .post(API_PATHS.ADD_ORDER_TO_CUSTOMER_PAST_ORDERS, params)
      .then(() => resolve({ success: true }))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Move an order from pending orders to active orders

const AddOrderToShopActiveOrders = (params) =>
  new Promise((resolve, reject) => {
    const { orderDetails, shopID } = params;
    if (!Object.keys(orderDetails).length === 0 || !shopID)
      return reject(
        "(AddOrderToShopActiveOrders) Parameters are not sufficient."
      );
    axios
      .post(API_PATHS.ADD_ORDER_TO_SHOP_ACTIVE_ORDERS, params)
      .then(({ data }) => resolve({ orderID: data.orderID, success: true }))
      .catch(({ response = {} }) =>
        resolve({
          error: response.data || "Failed to add order to active orders.",
          success: false,
        })
      );
  });
const AddOrderToShopPastOrders = (params) =>
  new Promise((resolve, reject) => {
    const { orderInfo, orderID, shopID } = params;
    if (!Object.keys(orderInfo).length === 0 || !shopID || !orderID)
      return reject(
        "(AddOrderToShopPastOrders) Parameters are not sufficient."
      );
    axios
      .post(API_PATHS.ADD_ORDER_TO_SHOP_PAST_ORDERS, params)
      .then(({ data }) => resolve({ orderID: data.orderID, success: true }))
      .catch(({ response = {} }) =>
        resolve({
          error: response.data || "Failed to add order to past orders.",
          success: false,
        })
      );
  });
// -----------------------------------------------------------------------
// Attach the payment method to the customer

const AttachPaymentMethodToCustomer = (params) =>
  new Promise((resolve, reject) => {
    if (!params.paymentMethodID || !params.stripeCustomerID)
      return reject(
        "(AttachPaymentMethodToCustomer) Parameters are not sufficient."
      );
    axios
      .post(API_PATHS.ATTACH_PAYMENT_METHOD_TO_CUSTOMER, params)
      .then(() => resolve({ success: true }))
      .catch(({ response = {} }) =>
        resolve({
          error: response.data || "Failed to add method.",
          success: false,
        })
      );
  });

// -----------------------------------------------------------------------
// Update the customer's profile

const ChangeCustomerProfile = (params) =>
  new Promise((resolve, reject) => {
    const { customerProfile, uuid } = params;
    if (Object.keys(customerProfile).length === 0 || !uuid)
      return reject("(ChangeCustomerProfile) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CHANGE_CUSTOMER_PROFILE, params)
      .then(() => resolve({ success: true }))
      .catch((error) => resolve({ error, success: false }));
  });

// ----------------------------------------------------------------------
// Clear the customer's cart at a particular shop

const ClearCustomerCart = (params) =>
  new Promise((resolve, reject) => {
    const { shopID, uuid } = params;
    if (!shopID || !uuid)
      return reject("(ClearCustomerCart) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CLEAR_CUSTOMER_CART, params)
      .then(resolve)
      .catch(reject);
  });

// ----------------------------------------------------------------------
// Create a stripe customer id for a Poso F&B customer
const CreateStripeCustomerID = (params) =>
  new Promise((resolve, reject) => {
    if (!params.uuid)
      return reject("(CreateStripeCustomerID). Parameters are not sufficient.");
    axios
      .post(API_PATHS.CREATE_STRIPE_CUSTOMER_ID, params)
      .then(({ data }) =>
        resolve({
          stripeCustomerID: data.stripeCustomerID || "",
          success: true,
        })
      )
      .catch(() => resolve({ success: false }));
  });

// ----------------------------------------------------------------------
// Remove a payment method from the customer
const DetachPaymentMethodFromCustomer = (params) =>
  new Promise((resolve, reject) => {
    if (!params.paymentMethodID)
      return reject(
        "(DetachPaymentMethodFromCustomer). Parameters are not sufficient."
      );
    axios
      .post(API_PATHS.DETACH_PAYMENT_METHOD_FROM_CUSTOMER, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Start the Stripe checkout process for the customer

const InitializeStripeCheckout = (params) =>
  new Promise((resolve, reject) => {
    const { cancel_url, line_items, payment_intent_data, success_url } = params;
    if (!cancel_url || !line_items || !payment_intent_data || !success_url)
      return reject(
        "(InitializeStripeCheckout) Parameters are not sufficient."
      );
    // Currently, card is the only supported payment method type; see https://stripe.com/docs/api/checkout/sessions/create
    const finalParams = immutable.set(params, "payment_method_types", ["card"]);
    axios
      .post(API_PATHS.INITIALIZE_STRIPE_CHECKOUT, finalParams)
      .then(({ data }) => {
        resolve({ stripeSessionID: data.stripeSessionID || "" });
      })
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Save multiple phone numbers to customer's profile

const SaveCustomerPhoneNumbers = (params) =>
  new Promise((resolve, reject) => {
    const { phoneNumbers = [] } = params;
    if (!phoneNumbers.length === 0) {
      const msg = "(SaveCustomerPhoneNumbers) Parameters are not sufficient.";
      return reject(msg);
    }
    axios
      .post(API_PATHS.SAVE_CUSTOMER_PHONE_NUMBERS, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

export default {
  AddOrderToCustomerPastOrders,
  AddOrderToShopActiveOrders,
  AddOrderToShopPastOrders,
  AttachPaymentMethodToCustomer,
  ChangeCustomerProfile,
  ClearCustomerCart,
  CreateStripeCustomerID,
  DetachPaymentMethodFromCustomer,
  InitializeStripeCheckout,
  SaveCustomerPhoneNumbers,
};
