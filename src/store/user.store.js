import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create(
  persist(
    (set) => ({
      profile: null,
      addresses: [],
      preferences: {},

      setProfile: (profile) => set({ profile }),
      setAddresses: (addresses) => set({ addresses }),
      setPreferences: (preferences) => set({ preferences }),
      reset: () => set({ profile: null, addresses: [], preferences: {} }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
