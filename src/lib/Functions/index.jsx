// Poso Reserved

import ConvertMenuFromWoflow from "./ConvertMenuFromWoflow";
import DateTime from "./DateTime";
import FoodMenuFuncs from "./FoodMenuFuncs";
import InfoSanitizer from "./InfoSanitizer";
import LocalStorage from "./LocalStorage";
import Math from "./Math";
import OrderMathFuncs from "./OrderMathFuncs";
import OrdersManagement from "./OrdersManagement";

// Fields
// import { Notification } from "../../fields";

// Lib
import { Services } from "../../lib";

const IsMobileDevice = () => {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
};

// -------------------------------------------------------------------
// Send a single text message to multiple numbers

const SendSingleTextMessageToMultipleNumbers = async (params) => {
  const { System } = Services;
  const { SendTextMessage } = System.PostRequests;
  const { body, phoneNumbers } = params;
  await Object.values(phoneNumbers).forEach(
    async (number) =>
      number && (await SendTextMessage({ body: body || "", to: number }))
  );
};

// -------------------------------------------------------------------
// Returns a pill notification that would appear at the top
// of the page

// const ShowConfirmNotif = ({ message, options, type }) => {
//   const { CreateAlertNotification } = Notification;
//   return CreateAlertNotification({
//     content: <div>{message || "Notification message"}</div>,
//     options: options || { autoClose: 2000 },
//     type: type || "default",
//   });
// };

// -------------------------------------------------------------------
// This method is to activate the audio on all devices

const WebAudioTouchUnlock = (audioContext) => {
  return new Promise((resolve, reject) => {
    if (audioContext.state === "suspended" || "ontouchstart" in window) {
      const unlock = () => {
        audioContext.resume().then(
          () => {
            document.body.removeEventListener("touchstart", unlock);
            document.body.removeEventListener("touchend", unlock);
            resolve(true);
          },
          (reason) => {
            reject(reason);
          }
        );
      };
      document.body.addEventListener("touchstart", unlock, false);
      document.body.addEventListener("touchend", unlock, false);
      unlock();
    } else {
      resolve(false);
    }
  });
};

export default {
  ConvertMenuFromWoflow,
  DateTime,
  InfoSanitizer,
  IsMobileDevice,
  FoodMenuFuncs,
  LocalStorage,
  Math,
  OrderMathFuncs,
  OrdersManagement,
  SendSingleTextMessageToMultipleNumbers,
  // ShowConfirmNotif,
  WebAudioTouchUnlock,
};
