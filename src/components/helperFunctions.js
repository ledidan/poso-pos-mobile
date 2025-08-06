class HelperFunctions {
  static getShortCode(name) {
    if (!name || typeof name !== "string") return "";

    const words = name.trim().split(/\s+/);

    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }

    if (words.length === 1 && words[0].length > 0) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return "";
  }

  static _convertMenu(menu) {
    if (!menu || typeof menu !== "object") return {};
    const result = {};
    Object.entries(menu).forEach(([menuId, menu]) => {
      const menuObj = menu;
      result[menuId] = {
        menuName: menuObj.menuName,
        groups: {},
      };
      Object.entries(menuObj.groups || {}).forEach(([groupId, group]) => {
        const groupObj = group;
        const items = {};
        Object.entries(groupObj.items || {}).forEach(([itemId, item]) => {
          const itemObj = item;
          let itemImage = "";
          if (
            typeof itemObj.itemImages === "object" &&
            itemObj.itemImages !== null &&
            "full" in itemObj.itemImages &&
            typeof itemObj.itemImages.full === "object" &&
            itemObj.itemImages.full?.imageURL
          ) {
            itemImage = itemObj.itemImages.full?.imageURL ?? "";
          }
          items[itemId] = {
            id: itemId,
            itemName: String(itemObj.itemName ?? ""),
            itemDescription: String(itemObj.itemDescription ?? ""),
            itemPrice: Number(itemObj.itemPrice ?? 0),
            itemOriginalPrice: itemObj.itemOriginalPrice
              ? Number(itemObj.itemOriginalPrice)
              : undefined,
            itemImage,
            itemIsDiscount: itemObj.itemIsDiscount,
            itemDiscountRate: itemObj.itemDiscountRate
              ? Number(itemObj.itemDiscountRate)
              : undefined,
            itemIsBestSeller: itemObj.itemIsBestSeller,
            itemIsTopRated: itemObj.itemIsTopRated,
            itemIsPopular: itemObj.itemIsPopular,
            itemToppings: itemObj.itemToppings,
            itemSaleRate: itemObj.itemSaleRate
              ? String(itemObj.itemSaleRate)
              : undefined,
            itemCalories: itemObj.itemCalories
              ? String(itemObj.itemCalories)
              : undefined,
            // itemNote: itemObj.itemNote ? String(itemObj.itemNote) : "",
            itemKitchenChitName: itemObj.itemKitchenChitName
              ? String(itemObj.itemKitchenChitName)
              : undefined,
            itemAllergens: itemObj.itemAllergens,
            itemIsOnSale: itemObj.itemIsOnSale,
            itemIsOutOfStock: itemObj.itemIsOutOfStock,
          };
        });
        result[menuId].groups[groupId] = {
          groupName: groupObj.groupName,
          items,
          index_in_list: groupObj.index_in_list,
        };
      });
    });
    return result;
  }
  static _convertFlatMenu(flatMenu) {
    if (!flatMenu || typeof flatMenu !== "object") return {};

    const result = {};
    Object.entries(flatMenu).forEach(([itemId, itemObj]) => {
      let itemImage = "";
      if (
        typeof itemObj.itemImages === "object" &&
        itemObj.itemImages !== null &&
        "full" in itemObj.itemImages &&
        typeof itemObj.itemImages.full === "object" &&
        itemObj.itemImages.full?.imageURL
      ) {
        itemImage = itemObj.itemImages.full?.imageURL ?? "";
      }

      result[itemId] = {
        itemID: itemId,
        itemName: String(itemObj.itemName ?? ""),
        itemDescription: String(itemObj.itemDescription ?? ""),
        itemPrice: Number(itemObj.itemPrice ?? 0),
        itemOriginalPrice: itemObj.itemOriginalPrice
          ? Number(itemObj.itemOriginalPrice)
          : undefined,
        itemImage,
        itemIsDiscount: itemObj.itemIsDiscount,
        itemDiscountRate: itemObj.itemDiscountRate
          ? Number(itemObj.itemDiscountRate)
          : undefined,
        itemIsBestSeller: itemObj.itemIsBestSeller,
        itemIsTopRated: itemObj.itemIsTopRated,
        itemIsPopular: itemObj.itemIsPopular,
        itemToppings: itemObj.itemToppings,
        itemSaleRate: itemObj.itemSaleRate
          ? String(itemObj.itemSaleRate)
          : undefined,
        itemCalories: itemObj.itemCalories
          ? String(itemObj.itemCalories)
          : undefined,
        // itemNote: itemObj.itemNote ? String(itemObj.itemNote) : "",
        itemKitchenChitName: itemObj.itemKitchenChitName
          ? String(itemObj.itemKitchenChitName)
          : undefined,
        itemAllergens: itemObj.itemAllergens,
        itemIsOnSale: itemObj.itemIsOnSale,
        itemIsOutOfStock: itemObj.itemIsOutOfStock,
      };
    });

    return result;
  }
  static ProcessBill(bills = {}) {
    return Object.entries(bills).map(([orderID, bill]) => {
      const {
        customerName = "",
        orderDeliveryTypeID,
        orderItems = [],
        timeStamp,
      } = bill;

      // Tổng tiền thực tế
      const computedTotal = orderItems.reduce((sum, item) => {
        const price = Number(item.itemSimpleDescription?.itemPrice || 0);
        const quantity = Number(item.quantity || 0);
        return sum + price * quantity;
      }, 0);

      // Lấy total chuẩn
      let total;
      if (typeof bill.total === "number") {
        total = bill.total === 0 ? computedTotal : bill.total;
      } else if (typeof bill.total === "string") {
        const parsed = parseFloat(
          bill.total.replace(/\./g, "").replace(/,/g, "")
        );
        total = isNaN(parsed) ? computedTotal : parsed;
      } else {
        total = computedTotal;
      }

      const items = orderItems.map((item) => ({
        itemName: item.itemSimpleDescription?.itemName || "",
        quantity: item.quantity || 1,
        itemID: item.itemID,
        itemPrice: item.itemSimpleDescription?.itemPrice || 0,
        itemImage: item.itemSimpleDescription?.itemImage || "",
        itemDescription: item.itemSimpleDescription?.itemDescription || "",
        itemIsDiscount: item.itemSimpleDescription?.itemIsDiscount || false,
        itemDiscountRate: item.itemSimpleDescription?.itemDiscountRate || 0,
        itemNote: item.itemSimpleDescription?.itemNote || "",
        itemIsBestSeller: item.itemSimpleDescription?.itemIsBestSeller || false,
        itemIsTopRated: item.itemSimpleDescription?.itemIsTopRated || false,
      }));

      return {
        orderID,
        customerName,
        isPaid: bill.isPaid || false,
        paymentMethod: bill.paymentMethod || "",
        paymentMethodDetail: bill.paymentMethodDetail || "",
        status: bill.status || "",
        orderDeliveryTypeID,
        total,
        timeStamp,
        orderItems: items,
      };
    });
  }
  static normalizeInput(text) {
    return text
      .toLowerCase()
      .replace(/ngh[ìi]n|ng[àa]n/g, "000")
      .replace(/(\d)[.,](\d)/g, "$1$2") // 20.000 => 20000
      .replace(/(\d+)\s*k\b/g, (_, num) => `${num}000`) // 20k => 20000
      .replace(/\s+/g, " ")
      .trim();
  }
}

export { HelperFunctions };
