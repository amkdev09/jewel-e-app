import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchFeaturedProducts, fetchProductById } from '../api/productsApi';

export const PRODUCTS_KEYS = {
  all: ['products'],
  list: (params) => [...PRODUCTS_KEYS.all, 'list', params],
  featured: () => [...PRODUCTS_KEYS.all, 'featured'],
  detail: (id) => [...PRODUCTS_KEYS.all, 'detail', id],
};

export function useProducts(params = {}) {
  return useQuery({
    queryKey: PRODUCTS_KEYS.list(params),
    queryFn: () => fetchProducts(params),
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: PRODUCTS_KEYS.featured(),
    queryFn: fetchFeaturedProducts,
  });
}

export function useProduct(id, options = {}) {
  return useQuery({
    queryKey: PRODUCTS_KEYS.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    ...options,
  });
}
