import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const REFRESH_KEY = 'refresh_token';

/**
 * Get stored access token (SecureStore).
 * Used by request interceptor to attach token.
 */
export async function getStoredToken() {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch {
    return null;
  }
}

/**
 * Attach auth token to requests and handle 401 (logout).
 * Uses lazy require of auth store to avoid circular dependency.
 */
export function setupInterceptors(axiosInstance) {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getStoredToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(normalizeError(error))
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const normalized = normalizeError(error);
      if (normalized.status === 401) {
        const { useAuthStore } = require('@/src/store/auth.store');
        useAuthStore.getState().logout();
      }
      return Promise.reject(normalized);
    }
  );
}

/**
 * Normalize axios error to a consistent shape.
 * @returns {{ message: string, status: number, code?: string, data?: any }}
 */
export function normalizeError(error) {
  if (error.response) {
    const data = error.response.data;
    const message =
      data?.message || data?.error || error.message || 'Request failed';
    return {
      message,
      status: error.response.status,
      code: data?.code,
      data: data,
    };
  }
  if (error.request) {
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
      code: 'NETWORK_ERROR',
    };
  }
  return {
    message: error.message || 'Something went wrong',
    status: 0,
  };
}

export { TOKEN_KEY, REFRESH_KEY };
