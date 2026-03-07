import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';

export async function fetchOrders(params = {}) {
  const { data } = await axiosClient.get(API.ORDERS.LIST, { params });
  return data;
}

export async function fetchOrderById(id) {
  const { data } = await axiosClient.get(API.ORDERS.BY_ID(id));
  return data;
}

export async function createOrder(payload) {
  const { data } = await axiosClient.post(API.ORDERS.CREATE, payload);
  return data;
}
