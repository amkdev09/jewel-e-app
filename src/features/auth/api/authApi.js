import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';

export async function registerApi(payload) {
  // payload must match backend docs for /api/auth/register
  const { data } = await axiosClient.post(API.AUTH.REGISTER, payload);
  return data;
}

export async function loginApi(identifier, password, countryCode) {
  const body = countryCode
    ? { identifier, password, countryCode }
    : { identifier, password };

  const { data } = await axiosClient.post(API.AUTH.LOGIN, body);
  return data;
}

export async function sendOtp(payload) {
  // { type: 'email' | 'phone', email? , phone?, countryCode? }
  const { data } = await axiosClient.post(API.AUTH.SEND_OTP, payload);
  return data;
}

export async function verifyOtp(payload) {
  const { data } = await axiosClient.post(API.AUTH.VERIFY_OTP, payload);
  return data;
}

export async function forgotPassword(payload) {
  const { data } = await axiosClient.post(API.AUTH.FORGOT_PASSWORD, payload);
  return data;
}

export async function resetPassword(payload) {
  const { data } = await axiosClient.post(API.AUTH.RESET_PASSWORD, payload);
  return data;
}

export async function changePassword(payload) {
  const { data } = await axiosClient.post(API.AUTH.CHANGE_PASSWORD, payload);
  return data;
}

