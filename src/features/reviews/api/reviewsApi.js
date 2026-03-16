import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';

export async function createReview(payload) {
  const { data } = await axiosClient.post(API.REVIEWS.CREATE, payload);
  return data;
}

export async function getProductReviews(productId, params = {}) {
  const { data } = await axiosClient.get(API.REVIEWS.BY_PRODUCT(productId), {
    params,
  });
  return data;
}

export async function getMyReview(productId) {
  const { data } = await axiosClient.get(API.REVIEWS.MY_REVIEW(productId));
  return data;
}

export async function updateReview(id, payload) {
  const { data } = await axiosClient.put(API.REVIEWS.UPDATE(id), payload);
  return data;
}

export async function deleteReview(id) {
  const { data } = await axiosClient.delete(API.REVIEWS.DELETE(id));
  return data;
}

