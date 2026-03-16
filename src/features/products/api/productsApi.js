import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';

export async function fetchProducts(params = {}) {
  const { data } = await axiosClient.get(API.PRODUCTS.LIST, { params });
  return data;
}

export async function fetchProductById(id) {
  const { data } = await axiosClient.get(API.PRODUCTS.BY_ID(id));
  return data;
}

export async function searchProducts(params = {}) {
  const { data } = await axiosClient.get(API.PRODUCTS.SEARCH, { params });
  return data;
}

