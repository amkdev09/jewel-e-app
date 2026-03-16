import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';

export async function createOrderFromCart(payload) {
  // payload shape must match backend docs for /api/order/create
  const { data } = await axiosClient.post(API.ORDERS.CREATE, payload);
  return data;
}

export async function getMyOrders(params = {}) {
  const { data } = await axiosClient.get(API.ORDERS.MY_ORDERS, { params });
  return data;
}

