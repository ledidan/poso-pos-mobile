import dayjs from "dayjs";

// const menuList = ["phở", "hủ tiếu", "bún bò", "trà đá", "cà phê"];
const quantityUnitList = ["ly", "cốc", "chai", "lon", "bát", "phần", "món"];
const priceUnitList = [
  "k",
  "ngàn",
  "nghìn",
  "ngan",
  "tr",
  "triệu",
  "trieu",
  "chục triệu",
  "trăm triệu",
  "tỷ",
  "tỉ",
  "ty",
];
const noteKeywords = ["k ", "ít ", "nhiều ", "thêm ", "ko ", "không "];
const customerKeywords = [
  "cho",
  "cua",
  "của",
  "anh",
  "chi",
  "chị",
  "co",
  "cô",
  "chú",
  "bac",
  "bác",
];
const quantityRegex = /\b(\d+)(?=\s+\S+)/;
const quantityUnitRegex =
  /\b(\d+)\s*(ly|cốc|chai|lon|bát|phần|món|tách|bịt|hủ|hộp|thùng|gói|tô)?/i;
const priceRegex =
  /(?:\b|^)(\d+(?:[\.,]\d+)?)(?:\s?)(k|ngàn|nghìn|ngan|tr|triệu|trieu|chục triệu|trăm triệu|tỷ|tỉ|ty)?\b/gi;
const noteRegex = new RegExp(`(${noteKeywords.join("|")})[^\\d]+`, "i");
const customerRegex = new RegExp(
  `(${customerKeywords.join("|")})[^\\d,]+`,
  "gi"
);
const sizeKeywords = ["nhỏ", "vừa", "lớn", "small", "medium", "large"];

class InputFunctions {
  static _removeVietnameseAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  static _formatVietnameseString(str) {
    if (typeof str !== "string") {
      return "";
    }

    const noAccentStr = str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/gi, "d");

    const formattedStr = noAccentStr.toUpperCase();

    return formattedStr;
  }
  static _normalizeText(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  static extractPrice(input) {
    let text = input.trim();
    let price = null;
    const match = [...text.matchAll(priceRegex)].pop();

    if (match) {
      let [fullMatch, numberStr, unit] = match;
      numberStr = numberStr.replace(",", ".");
      let number = parseFloat(numberStr);
      let multiplier = 1;

      switch ((unit || "").toLowerCase()) {
        case "k":
        case "ngàn":
        case "nghìn":
        case "ngan":
          multiplier = 1_000;
          break;
        case "tr":
        case "triệu":
        case "trieu":
          multiplier = 1_000_000;
          break;
        case "chục triệu":
          multiplier = 10_000_000;
          break;
        case "trăm triệu":
          multiplier = 100_000_000;
          break;
        case "tỷ":
        case "tỉ":
        case "ty":
          multiplier = 1_000_000_000;
          break;
        default:
          multiplier = 1;
      }

      price = Math.round(number * multiplier);
      text = text.replace(fullMatch, "").trim();
    }

    return { price, text };
  }

  static extractNote(input) {
    const match = input.match(noteRegex);
    if (!match) return { note: null, text: input };
    const note = match[0].trim();
    const text = input.replace(note, "").trim();
    return { note, text };
  }

  static detectItemName(text, dynamicMenuList) {
    const normText = this._normalizeText(text);
    if (!normText) return null;

    const sortedMenu = [...dynamicMenuList].sort((a, b) => b.length - a.length);

    const matched = sortedMenu.find((item) =>
      normText.includes(this._normalizeText(item))
    );
    return matched || null;
  }

  static extractNoteAndCustomer(input) {
    let note = null;
    let customerName = null;

    const match = input.match(customerRegex);

    if (match) {
      customerName = match[0]
        .replace(/^(cho|cua|của|anh|chi|chị|co|cô|chú|bac|bác)\s+/i, "")
        .trim();
      note = input.replace(match[0], "").trim();
    } else {
      note = input.trim();
    }

    return { note: note || null, customerName: customerName || "" };
  }

  static extractQuantity(input) {
    const match = input.match(quantityRegex);
    if (!match) return { quantity: 1, text: input };
    const quantity = parseInt(match[1]);
    const text = input.replace(match[0], "").trim();
    return { quantity, text };
  }

  static extractQuantityAndUnit(input) {
    const match = input.match(quantityUnitRegex);
    if (!match) return { quantity: 1, unit: null, text: input };

    const quantity = parseInt(match[1]);
    const unit = match[2] || null;
    const text = input.replace(match[0], "").trim();

    return { quantity, unit, text };
  }

  static extractSize(text) {
    const regex = new RegExp(`\\b(${sizeKeywords.join("|")})\\b`, "i");
    const match = text.match(regex);
    if (match) {
      const size = match[1].toLowerCase();
      const textWithoutSize = text.replace(regex, "").trim();
      return { size, text: textWithoutSize };
    }
    return { size: null, text };
  }

  static extractCustomerName(originalText, itemName) {
    if (!itemName) return "";

    const normOriginal = this._removeVietnameseAccents(
      originalText.toLowerCase()
    );
    const normItemName = this._removeVietnameseAccents(itemName.toLowerCase());

    const startIndex = normOriginal.indexOf(normItemName);
    if (startIndex === -1) return "";

    const remaining =
      originalText.slice(0, startIndex) +
      originalText.slice(startIndex + itemName.length);
    return remaining.trim() || "";
  }

  static _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static parseInput(inputRaw, dynamicMenuList) {
    let input = inputRaw.trim();

    const {
      quantity,
      unit,
      text: afterQuantity,
    } = this.extractQuantityAndUnit(input);

    const { price, text: afterPrice } = this.extractPrice(afterQuantity);

    const { note, customerName } = this.extractNoteAndCustomer(afterPrice);
    const cleanNote = note ? note.replace(/\s+/g, " ").trim() : "";
    const cleanCustomerName = customerName
      ? customerName.replace(/\s+/g, " ").trim()
      : "";

    const remainingText = afterPrice.replace(note || "", "").trim();
    const itemName = this.detectItemName(remainingText, dynamicMenuList);
    const cleanItemName = itemName ? itemName.replace(/\s+/g, " ").trim() : "";

    return {
      itemName: this._capitalize(cleanItemName),
      itemPrice: price,
      itemQuantity: quantity,
      itemUnit: unit,
      itemNote: cleanNote,
      customerName: cleanCustomerName,
    };
  }

  static parseInputWithMenu(inputRaw, menusFromDB) {
    const dynamicMenuList = menusFromDB.map((menu) => menu.itemName);
    let input = inputRaw.trim();

    const {
      quantity,
      unit,
      text: afterQuantity,
    } = this.extractQuantityAndUnit(input);
    const { price, text: afterPrice } = this.extractPrice(afterQuantity);

    const { note, customerName } = this.extractNoteAndCustomer(afterPrice);
    const textAfterNote = afterPrice.replace(note || "", "").trim();

    const normText = this._normalizeText(textAfterNote);
    const sortedMenu = [...dynamicMenuList].sort((a, b) => b.length - a.length);
    const matchedItem = sortedMenu.find((menuName) =>
      normText.includes(this._normalizeText(menuName))
    );

    let itemNote = note?.trim() || "";
    let itemName = "";
    let matchedMenu = null;

    if (matchedItem) {
      itemName = matchedItem;
      matchedMenu = menusFromDB.find(
        (menu) =>
          this._normalizeText(menu.itemName) ===
          this._normalizeText(matchedItem)
      );

      const rawNote = textAfterNote
        .replace(new RegExp(matchedItem, "i"), "")
        .trim();
      if (!itemNote && rawNote.length > 0) {
        itemNote = rawNote;
      }
    } else {
      itemName = textAfterNote;
    }

    let cleanItemName = itemName.trim();
    if (!cleanItemName && !matchedMenu) {
      cleanItemName = itemNote.trim();
      itemNote = null;
    }
    cleanItemName = this._capitalize(cleanItemName);
    const cleanNote = itemNote?.trim().replace(/\s+/g, " ") || null;
    const cleanCustomer = customerName.trim().replace(/\s+/g, " ");
    const itemID = matchedMenu?.itemID || dayjs().unix();

    return {
      itemID,
      itemName: cleanItemName,
      itemPrice: price || matchedMenu?.itemPrice || null,
      itemQuantity: quantity,
      itemUnit: unit || null,
      itemNote: cleanNote || null,
      customerName: cleanCustomer || "",
      matchedMenu: matchedMenu || null,
      isNewItem: !matchedMenu,
    };
  }
}

export { InputFunctions };
