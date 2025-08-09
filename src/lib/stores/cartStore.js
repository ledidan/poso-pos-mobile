import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  orderItems: [],

  // addItem: (product) => {
  //   const { orderItems = [] } = get();
  //   const existingItem = orderItems.find((item) => item.itemID === product.itemID);
  //   if (existingItem) {
  //     const updatedItems = orderItems.map((item) =>
  //       item.itemID === product.itemID
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     );
  //     set({ orderItems: updatedItems });
  //   } else {
  //     const newItem = {
  //       ...product,
  //       quantity: 1,
  //     };
  //     set({ orderItems: [...orderItems, newItem] });
  //   }
  // },
  addItem: (product) => {
    const { orderItems } = get();
  
    // Sửa lại itemName nếu bị sai (do AI parser)
    const displayName = product.itemNote || product.itemName;
    const id = product.itemID || Date.now(); // fallback nếu thiếu itemID
  
    const existingItem = orderItems.find((item) => item.itemID === id);
  
    if (existingItem) {
      const updatedItems = orderItems.map((item) =>
        item.itemID === id
          ? { ...item, quantity: item.quantity + (product.itemQuantity || 1) }
          : item
      );
      set({ orderItems: updatedItems });
    } else {
      const newItem = {
        ...product,
        itemID: id,
        itemName: displayName,
        quantity: product.itemQuantity || 1,
      };
      set({ orderItems: [...orderItems, newItem] });
    }
  },
  removeItem: (itemID) => {
    set((state) => ({
      orderItems: state.orderItems.filter((item) => item.itemID !== itemID),
    }));
  },

  increaseQuantity: (itemID) => {
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.itemID === itemID ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  },

  decreaseQuantity: (itemID) => {
    set((state) => ({
      orderItems: state.orderItems
        .map((item) =>
          item.itemID === itemID
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },
  setQuantity: (itemID, quantity) => {
    set((state) => ({
      orderItems: state.orderItems
        .map((item) =>
          item.itemID === itemID ? { ...item, quantity: quantity } : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  // updateItem: (itemID, item) => {
  //   set((state) => ({
  //     items: state.items.map((item) =>
  //       item.itemID === itemID ? { ...item, ...item } : item
  //     ),
  //   }));
  // },
  updateItem: (itemID, updatedItem) => {
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.itemID === itemID ? { ...item, ...updatedItem } : item
      ),
    }));
  },
  updateCart: (orderID, items) => {
    set({
      orderItems: items,
      orderID,
    });
  },

  clearCart: () => {
    set({ orderItems: [] });
  },
}));
