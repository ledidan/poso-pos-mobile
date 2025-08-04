import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product) => {
    const { items } = get();
    const existingItem = items.find((item) => item.itemID === product.itemID);

    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.itemID === product.itemID
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      set({ items: updatedItems });
    } else {
      const newItem = {
        ...product,
        quantity: 1,
      };
      set({ items: [...items, newItem] });
    }
  },

  removeItem: (itemID) => {
    set((state) => ({
      items: state.items.filter((item) => item.itemID !== itemID),
    }));
  },

  increaseQuantity: (itemID) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.itemID === itemID ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  },

  decreaseQuantity: (itemID) => {
    set((state) => ({
      items: state.items
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
      items: state.items
        .map((item) =>
          item.itemID === itemID ? { ...item, quantity: quantity } : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  updateItem: (itemID, item) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.itemID === itemID ? { ...item, ...item } : item
      ),
    }));
  },

  updateCart: (orderID, items) => {
    set({
      items: items,
      orderID,
    });
  },

  clearCart: () => {
    set({ items: [] });
  },
}));
