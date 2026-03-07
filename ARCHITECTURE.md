# Jewel E-App – Production Architecture

Production-ready React Native Expo (JavaScript) architecture for a large-scale jewelry ecommerce app (CaratLane-style).

## Stack

- **React Native Expo** (latest) – Expo Router (file-based), Reanimated, Gesture Handler
- **Zustand** – Global state (auth, cart, user, wishlist) with AsyncStorage persistence
- **TanStack React Query** – Server state (products, categories, orders)
- **Axios** – API client with interceptors and error normalization
- **Expo Secure Store** – Token storage
- **FlashList** – High-performance lists (use `@shopify/flash-list` in product grids)
- **AsyncStorage** – Persistent storage for Zustand stores

---

## Folder Structure

```
jewel-e-app/
├── app/                          # Expo Router entry (file-based routing)
│   ├── _layout.js                # Root: QueryClient, auth redirect, Stack
│   ├── index.js                  # Redirects to (auth)/login or (tabs)/home
│   ├── modal.js
│   ├── (auth)/
│   │   ├── _layout.js
│   │   ├── login.js
│   │   └── register.js
│   └── (tabs)/
│       ├── _layout.js            # 5 tabs: Home, Categories, Treasure, Store, Profile
│       ├── index.js              # Redirect to home (hidden from tab bar)
│       ├── home.js                # Sample jewelry home UI
│       ├── categories.js
│       ├── treasure.js
│       ├── store.js
│       └── profile.js
│
├── src/
│   ├── constants/
│   │   ├── routes.js
│   │   ├── colors.js
│   │   └── spacing.js
│   ├── theme/
│   │   └── theme.js
│   ├── utils/
│   │   ├── formatPrice.js
│   │   └── helpers.js
│   ├── services/
│   │   └── api/
│   │       ├── axiosClient.js    # Base URL, timeout, interceptors
│   │       ├── interceptors.js   # Auth token, 401 logout, normalizeError
│   │       └── endpoints.js      # API path constants
│   ├── store/
│   │   ├── auth.store.js         # Zustand + AsyncStorage + SecureStore
│   │   ├── cart.store.js
│   │   ├── user.store.js
│   │   └── wishlist.store.js
│   ├── navigation/
│   │   └── guards/
│   │       ├── AuthGuard.js      # Redirect to login if not authenticated
│   │       ├── GuestGuard.js     # Redirect to app if authenticated
│   │       └── PremiumGuard.js   # Premium-only routes
│   ├── layouts/
│   │   ├── MainLayout.js        # Safe area, header, loading
│   │   ├── AuthLayout.js        # Auth screens (keyboard avoid, scroll)
│   │   └── ScreenLayout.js       # Consistent padding/background
│   ├── components/
│   │   ├── ui/
│   │   │   └── Card.js
│   │   └── product/
│   │       └── ProductCard.js    # Memoized, formatPrice, wishlist
│   └── features/
│       ├── auth/api/
│       ├── products/api/         # productsApi.js
│       ├── products/hooks/      # useProducts, useFeaturedProducts, useProduct
│       ├── cart/api/
│       └── orders/api/
│
├── assets/
├── babel.config.js               # module-resolver: @ -> .
├── .prettierrc.js
└── eslint.config.js
```

---

## Navigation & Route Protection

- **Root layout** (`app/_layout.js`): Wraps app in `QueryClientProvider`; after `hydrateAuth()`, redirects unauthenticated users from `(tabs)` to `/(auth)/login` and authenticated users from `(auth)` to `/(tabs)/home`.
- **Tabs**: Home, Categories, Treasure Chest, Find Store, Profile. Lazy tabs enabled.
- **Guards**: Use `AuthGuard`, `GuestGuard`, or `PremiumGuard` in any layout/screen that needs protection.

---

## API Client

- **axiosClient**: `baseURL`, `timeout`, `Content-Type`/`Accept`.
- **Request interceptor**: Reads token from Expo Secure Store and sets `Authorization: Bearer <token>`.
- **Response interceptor**: On 401, calls `useAuthStore.getState().logout()` (clears token and state).
- **normalizeError**: Returns `{ message, status, code?, data? }` for consistent handling.

---

## State

- **Zustand**: `auth` (persisted with AsyncStorage, token in Secure Store), `cart`, `user`, `wishlist`.
- **TanStack Query**: Products, categories, orders, search. Configured in root layout with `staleTime` and `retry`.

---

## Performance

- **ProductCard** is memoized.
- Tabs use `lazy: true`.
- Use **FlashList** for long product lists: replace `FlatList` with `FlashList` and pass `estimatedItemSize` for smooth scrolling with thousands of items.
- Use **expo-image** for images (caching and priority).

---

## Code Quality

- **ESLint**: `npm run lint` (Expo config).
- **Prettier**: `npm run format`; config in `.prettierrc.js`.
- **Absolute imports**: `@/src/...` (e.g. `@/src/store/auth.store`, `@/src/constants/colors`). Babel `module-resolver` alias `@` → `.`

---

## Env

Set `EXPO_PUBLIC_API_URL` for the API base URL (e.g. `https://api.yourapp.com/v1`).

---

## Running

```bash
npm start
# or
npx expo start
```

For a clean start: `npx expo start --clear`.
