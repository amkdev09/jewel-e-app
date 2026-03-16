import axios from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: `https://carat-adavance-backend.onrender.com/api`,
  timeout: 2800000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    if (config.skipAuth === true) {
      if (typeof config.headers?.delete === 'function') {
        config.headers.delete('Authorization');
      } else {
        delete config.headers.Authorization;
      }
      return config;
    }
    const token = SecureStore.getItemAsync('token');
    if (token) {
      config.headers.Authorization = `Bearer ${await token}`;
    }
    return config;
  },
  async (error) => Promise.reject(error)
);

const shouldSkipRefresh = (config) => !config || config._retry === true || config.skipAuth === true;

const clearAuthAndRedirect = () => {
  SecureStore.deleteItemAsync('token');
  SecureStore.deleteItemAsync('refreshToken');
  router.replace('/(auth)/login');
};

let isRefreshing = false;
let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(({ resolve, reject }) => {
//     if (error) reject(error);
//     else resolve(token);
//   });
//   failedQueue = [];
// };

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;
    const requestUrl = originalRequest?.url || '';
    const isAuthEndpoint = requestUrl.startsWith('/auth');

    // For non-auth endpoints, force logout on 401/403
    if ((status === 401 || status === 403) && !isAuthEndpoint) {
      clearAuthAndRedirect();
      return Promise.reject(error?.response?.data ?? error);
    }

    // For auth endpoints (/auth/*) or other statuses, just bubble up the error
    if (shouldSkipRefresh(originalRequest)) {
      return Promise.reject(error?.response?.data ?? error);
    }

    // const refreshToken = localStorage.getItem('refreshToken');
    // if (!refreshToken) {
    //   return Promise.reject(error?.response?.data ?? error);
    // }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    // try {
    //   const { data } = await api.post(
    //     "/trade/refreshToken",
    //     { refreshToken },
    //     { skipAuth: true }
    //   );
    //   const newToken = data?.data?.token ?? null;
    //   const newRefreshToken = data?.data?.refreshToken ?? null;

    //   if (newToken) Cookies.set("token", newToken);
    //   if (newRefreshToken) Cookies.set("refreshToken", newRefreshToken);

    //   processQueue(null, newToken);
    //   originalRequest.headers.Authorization = `Bearer ${newToken}`;
    //   return api(originalRequest);
    // } catch (refreshError) {
    //   processQueue(refreshError, null);
    //   clearAuthAndRedirect();
    //   return Promise.reject(refreshError?.response?.data ?? refreshError);
    // } finally {
    //   isRefreshing = false;
    // }
  }
);

export default api;
