// Poso Reserved

// Lib
import REGEX from "./RegEx";

const BUTI_EMAIL_ADDRESSES = ["didan.mobe@gmail.com"];

const OWNER_INFO_FIELDS = [
  "ownerName",
  "lastFourDigitsOfSSN",
  "dob",
  "ownerMobileNumber",
  "businessWebsite",
];

const CHECKING_ACCOUNT_FIELDS = [
  "businessName",
  "accountNumber",
  "routingNumber",
  "federalTaxID",
];

const COUPON_INFO_SECTION = [
  {
    id: "couponInfo",
    name: "Coupon Information",
    fields: [
      {
        fieldKind: "text",
        id: "name",
        label: "Name",
        required: true,
      },
      {
        fieldKind: "text",
        id: "description",
        label: "Description",
        required: false,
      },
    ],
  },
];

const CUSTOMER_TIPPING_OPTIONS = {
  option1: {
    label: "15%",
    multiplier: 0.15,
  },
  option2: {
    label: "20%",
    multiplier: 0.2,
  },
  option3: {
    label: "30%",
    multiplier: 0.3,
  },
  other: { label: "😭" },
};

const AVERAGE_PREPARATION_TIMES = {
  timeRange1: {
    label: "10 - 20 phút",
  },
  timeRange2: {
    label: "20 - 40 phút",
  },
  timeRange3: {
    label: "> 40 phút",
  },
  timeRange4: {
    label: "Tùy chọn",
  },
};

const OPPORTUNITIES = [
  {
    id: "softwareEngineer",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/buti-sheryl-angel.appspot.com/o/BUTI%2FSoftware%20Gray.svg?alt=media&token=2fe6a8ca-6649-435e-a6a0-d84f52067642",
    name: "Software Engineer",
    description:
      "Be the next rockstar developer and build amazing products used by billions",
    details: [
      {
        name: "Tech Stack",
        description: "React, Express.js, ElasticSearch and growing",
      },
      {
        name: "Responsibility",
        description: "You will involve in every engineering aspect",
      },
      {
        name: "Expectation",
        description: "Build something you want your family to use",
      },
    ],
  },
  {
    id: "influencer",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/buti-sheryl-angel.appspot.com/o/BUTI%2FInfluencer%20Gray.svg?alt=media&token=e67bcf88-a0da-4c54-a220-fc8a494b7705",
    name: "Influencer",
    description:
      "Be the great influencer you meant to be and enlist people in our revolution",
    details: [
      {
        name: "Tools",
        description: "GTrends, Instagram, Facebook and growing",
      },
      {
        name: "Responsibility",
        description: "You will involve in every marketing aspect",
      },
      {
        name: "Expectation",
        description: "Spread the word for something you love",
      },
    ],
  },
];

const MERCHANT_GET_PAID_FORM = {
  businessName: {
    label: "Legal Business Name",
    placeholder: "Good Company LLC",
    required: true,
  },
  accountNumber: {
    label: "Bank Account Number",
    required: true,
    type: "number",
  },
  routingNumber: {
    label: "Routing Number",
    required: true,
    type: "number",
  },
  federalTaxID: {
    label: "Federal Tax ID (or SSN)",
    required: true,
    type: "number",
  },
  ownerName: {
    label: "Name Of Owner",
    required: true,
  },
  lastFourDigitsOfSSN: {
    label: "Last 4 digits of SSN",
    placeholder: "0000",
    required: true,
    regEx: REGEX.LAST_FOUR_DIGITS_OF_SSN,
    type: "number",
  },
  dob: {
    label: "Date Of Birth",
    placeholder: "MM/DD/YYYY",
    regEx: REGEX.DATE_OF_BIRTH,
    required: true,
  },
  ownerMobileNumber: {
    label: "Mobile Number",
    regEx: REGEX.US_PHONE_NUMBER,
    required: true,
    type: "number",
  },
  businessWebsite: {
    label: "Business Website",
    regEx: REGEX.WEBSITE,
  },
};

// ---------------------------------------------------------------------
// Form fields for creating a new group
const NEW_GROUP_FIELDS = [
  {
    fieldKind: "text",
    id: "groupName",
    label: "Tên danh mục",
    placeholder: "Nhập tên danh mục",
    required: true,
  },
];

// ---------------------------------------------------------------------
// Form set time for creating a new group
const NEW_GROUP_AVAILABILITY = [
  {
    fieldKind: "radio",
    id: "date_selection",
    label: "Chọn ngày hiển thị",
    options: {
      every_day: { label: "Mỗi ngày" },
      custom_date: { label: "Tuỳ chọn ngày" },
    },
    required: true,
  },
];
// ---------------------------------------------------------------------
// Form fields for creating new item

// ---------------------------------------------------------------------
// Form fields for creating new items

const NEW_ITEM_FIELDS = [
  {
    fieldKind: "text",
    id: "itemName",
    label: "Tên sản phẩm",
    placeholder: "Nhập tên sản phẩm",
    required: true,
  },
  {
    fieldKind: "text",
    id: "itemUnitName",
    label: "Đơn vị",
    placeholder: "Ví dụ: Lon",
    required: false,
  },
  {
    fieldKind: "text",
    id: "itemCode",
    label: "Mã sản phẩm (SKU)",
    placeholder: "SKU-001",
    required: false,
  },
  {
    fieldKind: "text",
    id: "itemPrice",
    label: "Giá bán($)",
    type: "price",
  },
  {
    fieldKind: "text",
    id: "itemOriginalPrice",
    label: "Giá vốn($)",
    type: "price",
    required: false,
  },
  {
    fieldKind: "text",
    id: "itemKitchenChitName",
    label: "Tên gọi trên phiếu bếp",
  },
  {
    fieldKind: "radio",
    id: "itemIsOutOfStock",
    label: "Sản phẩm hết hàng ?",
    options: {
      false: { label: "Không" },
      true: { label: "Có" },
    },
    required: true,
  },
  {
    fieldKind: "radio",
    id: "itemIsOnSale",
    label: "Sản phẩm đang giảm giá ?",
    options: {
      false: { label: "Không" },
      true: { label: "Có" },
    },
  },
  {
    fieldKind: "text",
    id: "itemSaleRate",
    label: "Phần trăm giảm giá",
    min: 0,
    max: 99,
    type: "number",
    unit: "%",
  },
  {
    fieldKind: "textarea",
    id: "itemDescription",
    label: "Nội dung sản phẩm",
    placeholder: "Nhập nội dung sản phẩm",
    rows: 3,
  },
  {
    fieldKind: "text",
    id: "itemCalories",
    label: "Calories",
    placeholder: "100",
    type: "number",
  },
  {
    fieldKind: "checkboxes",
    id: "itemAllergens",
    label: "Dị ứng",
    options: [],
  },
  {
    fieldKind: "textarea",
    id: "itemNote",
    label: "Ghi chú cho khách hàng",
    rows: 3,
  },
];

// ---------------------------------------------------------------------
// Form fields for creating new menu

const NEW_MENU_FIELDS = [
  {
    fieldKind: "text",
    id: "menuName",
    label: "Tên thực đơn",
    placeholder: "Nhập tên thực đơn",
    required: true,
  },
  {
    fieldKind: "radio",
    id: "isMenuForCatering",
    label: "Thực đơn dành cho dịch vụ ăn uống?",
    options: {
      true: { label: "Yes" },
      false: { label: "No" },
    },
    required: true,
  },
];

// ---------------------------------------------------------------------
// Form fields for creating new modifier
const NEW_MODIFIER_FIELDS = [
  {
    fieldKind: "text",
    id: "modifierName",
    label: "Tên ",
    placeholder: "vd: trân châu trắng, trả giò thêm...",
    required: true,
  },
  {
    fieldKind: "text",
    id: "modifierCode",
    label: "Mã sản phẩm đi kèm",
    placeholder: "SKU-001",
    required: false,
  },
  {
    fieldKind: "text",
    id: "modifierKitchenChitName",
    label: "Tên gọi trên phiếu bếp",
  },
  {
    fieldKind: "textarea",
    id: "modifierDescription",
    label: "Nội dung",
    placeholder: "Điền nội dung sản phẩm đi kèm",
    rows: 2,
  },
  {
    fieldKind: "text",
    id: "modifierPrice",
    label: "Giá ($)",
    type: "price",
  },
];

// ---------------------------------------------------------------------
// Form fields for creating new modifier group

const NEW_MODIFIER_GROUP_FIELDS = [
  {
    fieldKind: "text",
    id: "modifierGroupName",
    label: "Tên",
    placeholder: "Tên gọi nhóm mặt hàng đi kèm là gì, ví dụ: Topping..",
    required: true,
  },
  {
    fieldKind: "text",
    id: "modifierGroupNote",
    label: "Ghi chú",
  },
  {
    fieldKind: "radio",
    id: "modifierGroupIsRequired",
    label: "Yêu cầu khách hàng chọn một tùy chọn?",
    options: {
      true: { label: "Có" },
      false: { label: "Không" },
    },
    required: true,
  },
  {
    fieldKind: "radio",
    id: "modifierGroupAllowMultipleChoices",
    label: "Khách hàng có thể chọn nhiều hơn một tùy chọn ?",
    options: {
      true: { label: "Có" },
      false: { label: "Không" },
    },
    required: true,
  },
  {
    fieldKind: "text",
    id: "modifierGroupMaxChoices",
    label: "Lựa chọn tối đa",
    type: "number",
  },
  {
    fieldKind: "text",
    id: "modifierGroupMinChoices",
    label: "Lựa chọn tối thiểu",
    min: 0,
    type: "number",
  },
];

// ---------------------------------------------------------------------
// Form fields for creating new debit card for diners

const NEW_PAYMENT_CARD_FIELDS = {
  email: {
    fieldKind: "text",
    placeholder: "Email",
    regEx: REGEX.EMAIL,
    type: "email",
    required: true,
  },
  // country: {
  //   fieldKind: "text",
  //   value: "United States",
  //   readOnly: true
  // },
  // line1: {
  //   fieldKind: "text",
  //   placeholder: "Address Line 1",
  //   required: true
  // },
  // line2: {
  //   fieldKind: "text",
  //   placeholder: "Address Line 2"
  // },
  // city: {
  //   fieldKind: "text",
  //   placeholder: "City",
  //   required: true
  // },
  // state: {
  //   fieldKind: "text",
  //   placeholder: "State (GA)",
  //   regEx: REGEX.US_STATES,
  //   required: true
  // },
  // postal_code: {
  //   fieldKind: "text",
  //   placeholder: "Zip",
  //   regEx: REGEX.POSTAL_CODE,
  //   required: true
  // }
};

const QUICK_REPORT_TEMPLATE = {
  inStore: {
    subTotalPlusTax: 0,
    subTotal: 0,
    totalItemsCount: 0,
    totalMerchantFee: 0,
    totalOrdersCount: 0,
    totalTipAmount: 0,
  },
  pickUp: {
    subTotalPlusTax: 0,
    subTotal: 0,
    totalItemsCount: 0,
    totalMerchantFee: 0,
    totalOrdersCount: 0,
    totalTipAmount: 0,
  },
  deliver: {
    subTotalPlusTax: 0,
    subTotal: 0,
    totalDeliverFee: 0,
    totalItemsCount: 0,
    totalMerchantFee: 0,
    totalOrdersCount: 0,
    totalTipAmount: 0,
  },
};

const SALES_REPORT_FILTER_OPTIONS = {
  pastWeek: {
    label: "1w",
  },
  pastFourWeeks: {
    label: "4w",
  },
  pastYear: {
    label: "1y",
  },
  monthToDate: {
    label: "Mtd",
  },
  quarterToDate: {
    label: "Qtd",
  },
  yearToDate: {
    label: "Ytd",
  },
  all: {
    label: "All",
  },
};

const SHOP_INFO_SECTIONS = [
  {
    id: "basicInfo",
    name: "Basic Information",
    fields: [
      {
        fieldKind: "text",
        id: "name",
        label: "Tên cửa hàng",
        placeholder: "Name of your shop",
        required: true,
        readOnly: true,
      },
      {
        fieldKind: "text",
        id: "shopId",
        label: "Mã cửa hàng",
        required: true,
        readOnly: true,
      },
      {
        fieldKind: "text",
        id: "address",
        label: "Địa chỉ",
        placeholder: "Address of your shop",
        required: true,
        readOnly: true,
      },
      {
        fieldKind: "text",
        id: "salesTax",
        label: "Thuế cửa hàng (%)",
        placeholder: "7.50",
        readOnly: true,
        type: "number",
      },
      {
        errortext: "Sai định dạng số điện thoại",
        fieldKind: "text",
        id: "phoneNumber",
        label: "Số điện thoại",
        regEx: REGEX.VN_PHONE_NUMBER,
      },
      // {
      //   errortext: "US Phone Number",
      //   fieldKind: "text",
      //   id: "phoneNumber",
      //   label: "Phone Number",
      //   regEx: REGEX.US_PHONE_NUMBER,
      // },
      {
        fieldKind: "text",
        id: "timeZone",
        label: "Đinh dạng múi giờ",
        readOnly: true,
      },
    ],
  },
  {
    id: "mobilePayment",
    name: "Customer Payment",
    fields: [
      {
        fieldKind: "switch",
        id: "enableMobilePay",
        label: "Enable Mobile Pay",
      },
    ],
  },
];

export {
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
};
