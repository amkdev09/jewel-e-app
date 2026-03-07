/**
 * Centralized route names for Expo Router.
 * Use with router.push(), href, or redirect.
 */
export const ROUTES = {
  // Auth
  LOGIN: '/(auth)/login',
  REGISTER: '/(auth)/register',

  // Tabs (main app)
  HOME: '/(tabs)/home',
  CATEGORIES: '/(tabs)/categories',
  TREASURE: '/(tabs)/treasure',
  STORE: '/(tabs)/store',
  PROFILE: '/(tabs)/profile',

  // Stack screens (extend per tab as needed)
  PRODUCT_DETAIL: '/product/[id]',
  CART: '/cart',
  WISHLIST: '/wishlist',
  ORDERS: '/orders',
};

export default ROUTES;
