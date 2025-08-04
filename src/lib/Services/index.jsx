// Poso Reserved

import System from "./System";
import Customers from "./Customers";
import Merchants from "./Merchants";

const BASE_URL = "http://192.168.1.8:8000";

const CUSTOMER_INTERFACE_BASE_URL = "http://localhost:3000";  

const MERCHANT_DASHBOARD_URL = "http://localhost:4000";

// POST METHODS
const ADD_EMAIL_TO_MAILING_LIST = `${BASE_URL}/addEmail`;

// -------------- RESTAURANT METHODS --------------
// GET METHODS
const CREATE_STRIPE_CONNECT_ACCOUNT = `${BASE_URL}/createStripeConnectAccount`;

// POST METHODS
const POST_NEW_SHOP_STRIPE_CONNECT_INFO = `${BASE_URL}/updateShopStripeConnectInfo`;

export default {
  System,
  Customers,
  Merchants,
  ADD_EMAIL_TO_MAILING_LIST,
  CREATE_STRIPE_CONNECT_ACCOUNT,
  CUSTOMER_INTERFACE_BASE_URL,
  MERCHANT_DASHBOARD_URL,
  POST_NEW_SHOP_STRIPE_CONNECT_INFO,
  SOCKET_IO_URL: BASE_URL,
};
