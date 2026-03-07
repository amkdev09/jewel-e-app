import { getStoredToken } from './interceptors';
import { normalizeError } from './interceptors';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com/v1';
const TIMEOUT = 15000;

function buildUrl(path, params) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  if (!params || Object.keys(params).length === 0) return url;
  const search = new URLSearchParams(params).toString();
  return `${url}${url.includes('?') ? '&' : '?'}${search}`;
}

async function request(method, path, body, config = {}) {
  const { params = {} } = config;
  const url = buildUrl(path, params);
  const token = await getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(url, {
      method,
      headers,
      ...(body != null && method !== 'GET' && { body: JSON.stringify(body) }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.status === 401) {
      const { useAuthStore } = require('@/src/store/auth.store');
      useAuthStore.getState().logout();
    }

    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (!res.ok) {
      throw normalizeError({
        response: { status: res.status, data },
        message: data?.message || data?.error || 'Request failed',
      });
    }

    return { data };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw normalizeError({ message: 'Request timeout', request: {} });
    }
    if (err.response) throw err;
    throw normalizeError({ request: {}, message: err.message });
  }
}

export const apiClient = {
  get: (path, config) => request('GET', path, null, config),
  post: (path, body, config) => request('POST', path, body, config),
  patch: (path, body, config) => request('PATCH', path, body, config),
  put: (path, body, config) => request('PUT', path, body, config),
  delete: (path, config) => request('DELETE', path, null, config),
};

export default apiClient;
