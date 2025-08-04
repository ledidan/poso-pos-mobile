// Poso F&B Reserved.

class Math {
  static parseVND = (str) => {
    if (typeof str === "number") return str;
    return Number(String(str).replace(/[^0-9]/g, "")) || 0;
  };
  static formatVND = (amount) => {
    if (typeof amount !== "number") amount = Number(amount);
    if (isNaN(amount)) return "";
    return amount.toLocaleString("vi-VN");
  };
  static roundUp = (value) => Math.ceil(parseFloat(value));
  static round = (value) => Math.round(parseFloat(value));
}

export default Math;
