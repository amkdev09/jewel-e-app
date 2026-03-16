import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';

export async function createRazorpayOrder(payload) {
  const { data } = await axiosClient.post(API.PAYMENT.CREATE_ORDER, payload);
  return data;
}

export async function verifyPayment(payload) {
  const { data } = await axiosClient.post(API.PAYMENT.VERIFY, payload);
  return data;
}

