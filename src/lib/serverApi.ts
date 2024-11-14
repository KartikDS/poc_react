'use server';
import { API_ERROR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';

interface PAYLOAD {
  data?: unknown;
  params?: unknown;
  token?: string;
  responseType?: string;
  headers?: {
    language?: string;
    'Cache-Control': string;
    'Content-Type'?: string;
    Authorization?: string;
    sessionId?: string;
  };
}

const ServerApi = async (url: string, method: string, payload: PAYLOAD = {}): Promise<unknown> => {
  const payLoadData = { ...payload };
  try {
    return await api(url, method, payLoadData);
  } catch (error) {
    const err = error as API_ERROR;
    if (err?.statusCode === 401) {
      console.log(`serverApi-25`, 'logout');
    }
    throw error;
  }
};

export default ServerApi;
