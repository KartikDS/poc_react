'use client';

import React, { useContext, useCallback, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useCommonReducer } from '@/components/App/reducer';
import { AUTH_USER } from '@/types/interfaces';
import { logout as clearCookies, validateAuthentication } from '@/utils/helpers';
import { useRequest } from '@/components/App';

interface Props {
  children: JSX.Element | JSX.Element[];
}
type EXTEND_STATE = { [key: string]: any };
interface STATE_DATA extends EXTEND_STATE {
  profileDetail?: undefined | null | AUTH_USER;
  show?: boolean;
}
interface CONTEXTVALUE {
  state: STATE_DATA;
  dispatch: React.Dispatch<STATE_DATA>;
  logout: () => void;
}
const AppContext = React.createContext<CONTEXTVALUE | null>(null);
export const ContainerContextProvider = ({ children }: Props) => {
  const { request } = useRequest();
  const pathname = usePathname();
  const router = useRouter();
  const { state, dispatch } = useCommonReducer({
    profileDetail: {},
    show: false,
  });

  const logout = useCallback(() => {
    clearCookies();
    // window.location.href = '/login';
    router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = useCallback(async () => {
    const { data } = (await request('GET_AUTH_USER')) as { data: AUTH_USER };
    dispatch({ profileDetail: data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!validateAuthentication()) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const value: CONTEXTVALUE = useMemo(() => {
    return {
      state: state as STATE_DATA,
      dispatch,
      logout,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useContainerContext() {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useContainerContext must be used within an ContainerProvider');
  }
  return context;
}
