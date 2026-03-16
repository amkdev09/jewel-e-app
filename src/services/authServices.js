import api from '@/src/utils/axios';

const authServices = {
  register: async (payload) => {
    const { data } = await api.post('auth/register', payload);
    return data;
  },
  login: async (identifier, password, countryCode) => {
    const body = countryCode ? { identifier, password, countryCode } : { identifier, password };
    const { data } = await api.post('auth/login', body);
    return data;
  },
  sendOtp: async (payload) => {
    const { data } = await api.post('auth/send-otp', payload);
    return data;
  },
  verifyOtp: async (payload) => {
    const { data } = await api.post('auth/verify-otp', payload);
    return data;
  },
  forgotPassword: async (payload) => {
    const { data } = await api.post('auth/forgot-password', payload);
    return data;
  },
  resetPassword: async (payload) => {
    const { data } = await api.post('auth/reset-password', payload);
    return data;
  },
  changePassword: async (payload) => {
    const { data } = await api.post('auth/change-password', payload);
    return data;
  },
};

export default authServices;
