'use client';
import { useCallback } from 'react';
import Cookies from 'js-cookie';

// import * as services from '@/store/services';
import { API_ERROR, API_RESPONSE, APIS_DATA, APIS_INTERFACE, KEYPAIR } from '@/types/interfaces';
import APIS from '@/utils/apis';
import { api } from '@/utils/axiosInterceptor';
import { handleErrors, logout } from '@/utils/helpers';

import { useCommonReducer } from './reducer';

export const useRequest = () => {
  const { state, dispatch } = useCommonReducer({
    loading: {},
  });

  const request = useCallback(
    (type: string, payload?: KEYPAIR | FormData, options?: KEYPAIR): Promise<API_RESPONSE> => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async resolve => {
        // Set Loading to True
        dispatch({
          loading: {
            ...state.loading,
            [type + '_LOADING']: true,
          },
        });
        const token = Cookies.get('accessToken');

        // Execute API Call
        const requestPayload = {} as {
          data: KEYPAIR | FormData;
          params?: KEYPAIR;
          token?: string;
          headers?: {
            'Content-Type'?: string;
          };
        };
        if (payload instanceof FormData) {
          requestPayload['headers'] = {
            'Content-Type': 'multipart/form-data',
          };
        }
        requestPayload['token'] = (token ?? '') as string;
        if (payload) {
          requestPayload['data'] = payload;
        }

        try {
          const apis = APIS as APIS_INTERFACE;
          const apiData: APIS_DATA | undefined = apis[type as keyof typeof apis];
          if (!apiData) return;
          if (apiData.method === 'GET' && requestPayload?.data && Object.keys(requestPayload?.data)?.length) {
            requestPayload['params'] = requestPayload.data as KEYPAIR;
          }

          const apiUrl = apiData.url.replace(/:([a-zA-Z]+)/g, (match: string, key: string): string => {
            return options && typeof options[key] === 'string' ? (options[key] as string) : match;
          });

          const data = await api(apiUrl, apiData.method, requestPayload);
          dispatch({
            loading: {
              ...state.loading,
              [type + '_LOADING']: false,
            },
            data,
          });
          if (data.statusCode >= 200 && data.statusCode < 300) {
            return resolve(data);
          }
          throw data;
        } catch (err) {
          dispatch({
            loading: {
              ...state.loading,
              [type + '_LOADING']: false,
            },
          });
          const error = err as API_ERROR;
          if (error?.statusCode === 401) {
            // sessionLogout();
            logout();
          } else {
            handleErrors(error);
          }
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );

  return {
    request,
    loading: state.loading as KEYPAIR,
  };
};
