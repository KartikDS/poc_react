'use client';
import React, { useState, useContext } from 'react';

import { useAlert } from './alert';
interface Props {
  children: JSX.Element | JSX.Element[];
}

interface ALERT {
  toast: (title: string, icon: any) => void;
}
interface CONTEXTVALUE {
  alert: ALERT;
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
}
const AppContext = React.createContext<CONTEXTVALUE | null>(null);
export const AppProvider = ({ children }: Props) => {
  const alert: ALERT = useAlert();
  const [userId, setUserId] = useState<number | null>(null);
  const value: CONTEXTVALUE = { alert, userId, setUserId };
  // if (process.env.NODE_ENV === 'production') {
  //   // eslint-disable-next-line @typescript-eslint/no-empty-function
  // }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp() {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
export { useRequest } from './request';
export { useLoading } from './Loader';
