import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { userServices } from '../services/appServices';
import authServices from '../services/authServices';

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
          const { data } = await authServices.login(email, password);
          const { accessToken, refreshToken, user } = data;
          await SecureStore.setItemAsync('token', accessToken);
          if (refreshToken) {
            await SecureStore.setItemAsync('refreshToken', refreshToken);
          }
          set({
            isAuthenticated: true,
            user: user || data.user,
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
          const { data } = await authServices.register(payload);
          const { accessToken, refreshToken, user } = data;
          if (accessToken) {
            await SecureStore.setItemAsync('token', accessToken);
            if (refreshToken) {
              await SecureStore.setItemAsync('refreshToken', refreshToken);
            }
          }
          set({
            isAuthenticated: !!accessToken,
            user: user || data.user,
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
          await authServices.logout().catch(() => {});
        } catch (_) {}
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('refreshToken');
        set({
          isAuthenticated: false,
          user: null,
        });
      },

      setUser: (user) => set({ user }),

      hydrateAuth: async () => {
        const token = await SecureStore.getItemAsync('token');
        if (!token) {
          set({ isAuthenticated: false, user: null, isLoading: false });
          return;
        }
        try {
          const { data } = await userServices.getProfile();
          set({
            isAuthenticated: true,
            user: data.user || data,
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
