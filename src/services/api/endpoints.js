/**
 * API endpoint paths (baseURL is set in axiosClient).
 */
const API = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  PRODUCTS: {
    LIST: '/products',
    BY_ID: (id) => `/products/${id}`,
    BY_CATEGORY: (slug) => `/products/category/${slug}`,
    SEARCH: '/products/search',
    FEATURED: '/products/featured',
  },
  CATEGORIES: {
    LIST: '/categories',
    BY_ID: (id) => `/categories/${id}`,
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/items',
    UPDATE: (id) => `/cart/items/${id}`,
    REMOVE: (id) => `/cart/items/${id}`,
  },
  WISHLIST: {
    LIST: '/wishlist',
    ADD: '/wishlist',
    REMOVE: (id) => `/wishlist/${id}`,
  },
  ORDERS: {
    LIST: '/orders',
    BY_ID: (id) => `/orders/${id}`,
    CREATE: '/orders',
  },
  USER: {
    PROFILE: '/user/profile',
    ADDRESSES: '/user/addresses',
  },
};

export default API;
