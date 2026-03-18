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
          const res = await authServices.login(email, password);
          const payload = res?.data ?? res;

          const accessToken =
            payload?.accessToken ?? payload?.token ?? payload?.tokens?.accessToken ?? payload?.data?.accessToken;
          const refreshToken =
            payload?.refreshToken ?? payload?.tokens?.refreshToken ?? payload?.data?.refreshToken;
          const user = payload?.user ?? payload?.data?.user ?? payload;

          if (typeof accessToken !== 'string' || !accessToken) {
            const apiMessage =
              payload?.message ||
              payload?.error ||
              'Login succeeded but no access token was returned by the server.';
            throw new Error(apiMessage);
          }

          await SecureStore.setItemAsync('token', accessToken);
          if (typeof refreshToken === 'string' && refreshToken) {
            await SecureStore.setItemAsync('refreshToken', refreshToken);
          }
          set({
            isAuthenticated: true,
            user: user || null,
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
          const res = await authServices.register(payload);
          const body = res?.data ?? res;

          const accessToken =
            body?.accessToken ?? body?.token ?? body?.tokens?.accessToken ?? body?.data?.accessToken;
          const refreshToken = body?.refreshToken ?? body?.tokens?.refreshToken ?? body?.data?.refreshToken;
          const user = body?.user ?? body?.data?.user ?? null;

          if (typeof accessToken === 'string' && accessToken) {
            await SecureStore.setItemAsync('token', accessToken);
            if (typeof refreshToken === 'string' && refreshToken) {
              await SecureStore.setItemAsync('refreshToken', refreshToken);
            }
          }
          set({
            isAuthenticated: !!accessToken,
            user,
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
