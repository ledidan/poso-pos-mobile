import { set } from "object-path-immutable";
import { _generateRandomID } from "../../utils";
import shortid from "shortid";

class RegisterNewShopHelper {
  static _createRandomAccessPin = () => {
    return String(Math.floor(10000 + Math.random() * 90000));
  };

  static _generateDefaultShopInfo = () => {
    return {
      ownerPassword: this._createRandomAccessPin(),
      timeZone: "Asia/Ho_Chi_Minh",
    };
  };

  static _constructNewShopInfo = ({ newShop = {} }) => {
    const {
      merchantFees = {},
      subscriptionInfo = {},
      name,
      unit,
      city,
      phoneNumber,
      personnelName = "",
      mobileNumber = "",
      businessCategory = "",
    } = newShop;

    const registerID = mobileNumber;
    const shopID = _generateRandomID();
    const street2 = unit ? `${unit}, ` : "";
    let newShopInfo = {
      basicInfo: {
        address: `${city}`,
        id: shopID,
        membership: { status: "comingSoon" },
        name: name || `shop-${shopID}`,
        phoneNumber: mobileNumber,
        businessCategory,
        phoneNumbersToReceiveOrders: {
          [this._createRandomAccessPin()]: phoneNumber,
        },
        show_payouts: true,
      },
      subscriptionInfo: {
        createdAt: new Date().toISOString(),
        packageInfo: {
          packageName: "Gói dùng thử",
          status: "active",
          packageType: "free",
          ordersLimit: 20,
          remainingOrders: 20,
        },
        ...subscriptionInfo,
      },
      personnelPins: {
        [registerID]: {
          mobileNumber,
          password: this._createRandomAccessPin(),
          personnelID: shortid.generate(),
          personnelName,
          role: "owner",
        },
        [this._createRandomAccessPin()]: {
          password: this._createRandomAccessPin(),
          personnelID: shortid.generate(),
          personnelName: "Staff",
          role: "staff",
        },
      },
    };
    if (mobileNumber) {
      newShopInfo = set(
        newShopInfo,
        `basicInfo.phoneNumbersToReceiveOrders.${shortid.generate()}`,
        mobileNumber
      );
    }
    return { newShopInfo, registerID };
  };
}

export default RegisterNewShopHelper;
