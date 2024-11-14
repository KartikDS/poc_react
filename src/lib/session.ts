'use server';

import axios from 'axios';

import APIS from '@/utils/apis';
import { AUTH_USER } from '@/types/interfaces';

export const getUserData = async (token: string) => {
  try {
    const API_URL = APIS['GET_AUTH_USER'];
    const { data } = (await axios({
      url: `${process.env.BACKEND}/v1${API_URL.url}`,
      method: API_URL.method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as { data: any };
    const user = data.data as AUTH_USER;
    if (user.role === 'USER' || !user.status) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
