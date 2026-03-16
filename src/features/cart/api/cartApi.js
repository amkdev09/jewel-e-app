import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';

export async function getCart() {
  const { data } = await axiosClient.get(API.CART.GET);
  return data;
}

export async function addToCart(payload) {
  // payload shape must match backend docs for /api/cart/add
  const { data } = await axiosClient.post(API.CART.ADD, payload);
  return data;
}

export async function removeFromCart(payload) {
  // { productId, variantId }
  const { data } = await axiosClient.delete(API.CART.REMOVE, {
    data: payload,
  });
  return data;
}

