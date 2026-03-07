import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';
import { TOKEN_KEY, REFRESH_KEY } from '@/src/services/api/interceptors';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      isPremium: false,

      setLoading: (loading) => set({ isLoading: loading }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await axiosClient.post(API.AUTH.LOGIN, {
            email,
            password,
          });
          const { accessToken, refreshToken, user } = data;
          await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
          if (refreshToken) {
            await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
          }
          set({
            isAuthenticated: true,
            user: user || data.user,
            isPremium: user?.isPremium ?? data.isPremium ?? false,
            isLoading: false,
          });
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return {
            success: false,
            message: err.message || 'Login failed',
          };
        }
      },

      register: async (payload) => {
        set({ isLoading: true });
        try {
          const { data } = await axiosClient.post(API.AUTH.REGISTER, payload);
          const { accessToken, refreshToken, user } = data;
          if (accessToken) {
            await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
            if (refreshToken) {
              await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
            }
          }
          set({
            isAuthenticated: !!accessToken,
            user: user || data.user,
            isPremium: user?.isPremium ?? false,
            isLoading: false,
          });
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return {
            success: false,
            message: err.message || 'Registration failed',
          };
        }
      },

      logout: async () => {
        try {
          await axiosClient.post(API.AUTH.LOGOUT).catch(() => {});
        } catch (_) {}
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_KEY);
        set({
          isAuthenticated: false,
          user: null,
          isPremium: false,
        });
      },

      setUser: (user) => set({ user, isPremium: user?.isPremium ?? false }),

      hydrateAuth: async () => {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (!token) {
          set({ isAuthenticated: false, user: null, isLoading: false });
          return;
        }
        try {
          const { data } = await axiosClient.get(API.AUTH.ME);
          set({
            isAuthenticated: true,
            user: data.user || data,
            isPremium: (data.user || data)?.isPremium ?? false,
            isLoading: false,
          });
        } catch {
          await get().logout();
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isPremium: state.isPremium,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
