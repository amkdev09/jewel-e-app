import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';

export async function getWishlist() {
  const { data } = await axiosClient.get(API.WISHLIST.GET);
  return data;
}

export async function addToWishlist(productId) {
  const { data } = await axiosClient.post(API.WISHLIST.ADD, { productId });
  return data;
}

export async function removeFromWishlist(productId, variantId) {
  const { data } = await axiosClient.post(API.WISHLIST.REMOVE, {
    productId,
    variantId,
  });
  return data;
}

