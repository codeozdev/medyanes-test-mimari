import { create } from "zustand";

// Sepet store'u
const useCartStore = create((set) => ({
  // State
  items: [], // Sepetteki ürünlerin listesi
  itemCount: 0, // Sepetteki toplam ürün sayısı

  // Actions
  addToCart: (product) => {
    set((state) => {
      // Eğer sepette 5 ürün varsa daha fazla eklemeyi engelle
      if (state.itemCount >= 5) return state;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Varolan ürünü güncelle
        const updatedItems = state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );

        return {
          items: updatedItems,
          itemCount: state.itemCount + 1,
        };
      } else {
        // Yeni ürün ekle
        return {
          items: [...state.items, { ...product, quantity: 1 }],
          itemCount: state.itemCount + 1,
        };
      }
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const itemToRemove = state.items.find((item) => item.id === productId);
      if (!itemToRemove) return state;

      // Eğer quantity 1'den büyükse sadece azalt, değilse kaldır
      if (itemToRemove.quantity > 1) {
        const updatedItems = state.items.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );

        return {
          items: updatedItems,
          itemCount: state.itemCount - 1,
        };
      } else {
        return {
          items: state.items.filter((item) => item.id !== productId),
          itemCount: state.itemCount - 1,
        };
      }
    });
  },

  clearCart: () => set({ items: [], itemCount: 0 }),
}));

export default useCartStore;
