import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      productIds: [],

      add: (productId) => {
        const ids = get().productIds;
        if (ids.includes(productId)) return;
        set({ productIds: [...ids, productId] });
      },

      remove: (productId) => {
        set({
          productIds: get().productIds.filter((id) => id !== productId),
        });
      },

      toggle: (productId) => {
        const ids = get().productIds;
        if (ids.includes(productId)) {
          set({ productIds: ids.filter((id) => id !== productId) });
        } else {
          set({ productIds: [...ids, productId] });
        }
      },

      has: (productId) => get().productIds.includes(productId),
    }),
    {
      name: 'wishlist-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useWishlistStore;
