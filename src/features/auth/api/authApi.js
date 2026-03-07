import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';

export async function loginApi(email, password) {
  const { data } = await axiosClient.post(API.AUTH.LOGIN, { email, password });
  return data;
}

export async function registerApi(payload) {
  const { data } = await axiosClient.post(API.AUTH.REGISTER, payload);
  return data;
}

export async function logoutApi() {
  await axiosClient.post(API.AUTH.LOGOUT);
}

export async function getMe() {
  const { data } = await axiosClient.get(API.AUTH.ME);
  return data;
}
