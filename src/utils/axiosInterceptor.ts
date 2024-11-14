import axios from 'axios';
import Cookies from 'js-cookie';

import { toastr } from '@/utils/helpers';
import { API_RESPONSE } from '@/types/interfaces';
// import { handleApiErrors } from './global';

// declare module 'axios' {
//   export interface AxiosRequestConfig {
//     // url: string;
//     // method: string;
//   }
// }
axios.interceptors.request.use(
  (config: any) => {
    if (typeof window !== 'undefined') {
      document.body.style.pointerEvents = 'none';
    }
    return config;
  },
  (error: any) =>
    // Do something with request error
    Promise.reject(error),
);

axios.interceptors.response.use(
  (response: any) => {
    if (typeof window !== 'undefined') {
      document.body.style.pointerEvents = 'auto';
    }
    return response;
  },
  (error: any) => Promise.reject(error),
);

interface API {
  (
    url: string,
    method?: string,
    options?: {
      data?: unknown;
      token?: string;
      responseType?: string;
      headers?: {
        language?: string;
        'Content-Type'?: string;
        Authorization?: string;
        sessionId?: string;
      };
    },
  ): Promise<API_RESPONSE>;
}

interface AxiosRequestConfig {
  url: string;
  method: string;
  data?: any;
  timeout?: number;
  headers?: {
    language?: string;
    'Content-Type'?: string;
    Authorization?: string;
    sessionId?: string;
  };
}
export const api: API = async (url, method = 'GET', options = {}) => {
  const lang = Cookies.get('lang') || 'en';

  let config: AxiosRequestConfig = {
    url,
    method: method || 'GET',
    timeout: 30000,
  };

  if (options.headers) {
    config = { ...config, headers: { ...options.headers } };
  }

  options['headers'] = {
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    language: lang as string,
    ...options.headers,
  };
  if (options.token) {
    options.headers['Authorization'] = 'Bearer ' + options.token;
    options.headers['sessionId'] = Cookies.get('sessionId');
  }

  config = { ...config, ...options };
  try {
    const resp = await axios(config);
    return resp.data;
  } catch (e: any) {
    if (typeof window !== 'undefined') {
      document.body.style.pointerEvents = 'auto';
    }
    if (e?.response?.data) {
      if (e.response.status === 504) {
        toastr('API services are currently Offline', 'warning');
      }
      throw e.response.data;
      // return { status: false, ...e.response.data };
    }
  }
};
