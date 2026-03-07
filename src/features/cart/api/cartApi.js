import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';

export async function getCart() {
  const { data } = await axiosClient.get(API.CART.GET);
  return data;
}

export async function addToCart(payload) {
  const { data } = await axiosClient.post(API.CART.ADD, payload);
  return data;
}

export async function updateCartItem(id, payload) {
  const { data } = await axiosClient.patch(API.CART.UPDATE(id), payload);
  return data;
}

export async function removeFromCart(id) {
  await axiosClient.delete(API.CART.REMOVE(id));
}
