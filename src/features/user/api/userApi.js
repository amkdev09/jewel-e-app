import { axiosClient } from '@/src/services/api/axiosClient';
import API from '@/src/services/api/endpoints';

export async function getUserProfile() {
  const { data } = await axiosClient.get(API.USER.PROFILE);
  return data;
}

export async function updateUserProfile(payload) {
  const { data } = await axiosClient.put(API.USER.UPDATE_PROFILE, payload);
  return data;
}

