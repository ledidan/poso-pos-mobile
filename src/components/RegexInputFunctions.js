const menuList = ["phở", "hủ tiếu", "bún bò", "trà đá", "cà phê"];
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
  static detectItemName(text, menuList) {
    const normText = this._removeVietnameseAccents(text.toLowerCase());
    const matched = menuList.find((item) =>
      normText.includes(this._removeVietnameseAccents(item.toLowerCase()))
    );
    return matched;
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
  static parseInput(inputRaw) {
    let input = inputRaw.trim();

    const {
      quantity,
      unit,
      text: afterQuantity,
    } = this.extractQuantityAndUnit(input);

    const { price, text: afterPrice } = this.extractPrice(afterQuantity);

    const itemName = this.detectItemName(afterPrice, menuList);
    let cleanItemName = itemName ? itemName.replace(/\s+/g, " ").trim() : "";
    const textWithoutItem =
      cleanItemName && afterPrice
        ? afterPrice.replace(new RegExp(cleanItemName, "i"), "").trim()
        : afterPrice;

    const { note, customerName } = this.extractNoteAndCustomer(textWithoutItem);
    const cleanNote = note ? note.replace(/\s+/g, " ").trim() : "";
    const cleanCustomerName = customerName
      ? customerName.replace(/\s+/g, " ").trim()
      : "";

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
    const parsed = this.parseInput(inputRaw);
    const { itemName } = parsed;

    if (!itemName) {
      return { ...parsed, matchedMenu: null, isNewItem: true };
    }

    const matchedMenu = menusFromDB.find(
        (menu) => this._removeVietnameseAccents(menu.itemName) === this._removeVietnameseAccents(itemName)
    );

    if (matchedMenu) {
      return {
        ...parsed,
        itemID: matchedMenu.itemID,
        matchedMenu,
        isNewItem: false,
      };
    }

    return {
      ...parsed,
      matchedMenu: null,
      isNewItem: true,
    };
  }
}

export { InputFunctions };
