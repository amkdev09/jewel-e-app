import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,

      addItem: (product, quantity = 1, options = {}) => {
        const items = [...get().items];
        const existing = items.find(
          (i) =>
            i.productId === product.id &&
            JSON.stringify(i.options || {}) === JSON.stringify(options)
        );
        if (existing) {
          existing.quantity += quantity;
        } else {
          items.push({
            productId: product.id,
            product,
            quantity,
            options,
          });
        }
        set({
          items,
          totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        });
      },

      removeItem: (productId, options = {}) => {
        const items = get().items.filter(
          (i) =>
            i.productId !== productId ||
            JSON.stringify(i.options || {}) !== JSON.stringify(options)
        );
        set({
          items,
          totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        });
      },

      updateQuantity: (productId, quantity, options = {}) => {
        if (quantity <= 0) {
          get().removeItem(productId, options);
          return;
        }
        const items = get().items.map((i) => {
          if (
            i.productId === productId &&
            JSON.stringify(i.options || {}) === JSON.stringify(options)
          ) {
            return { ...i, quantity };
          }
          return i;
        });
        set({
          items,
          totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        });
      },

      clearCart: () => set({ items: [], totalItems: 0 }),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCartStore;
