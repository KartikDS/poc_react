'use client';
import React, { useEffect, useState } from 'react';
import { useContainerContext } from '../Container/context';
import { useLoading } from '@/components/App';
import Accounts from '../Settings/Accounts';

function Index() {
  const { ButtonLoader } = useLoading();
  const { state: globalState } = useContainerContext();
  const [page, setPage] = useState<boolean | null>(null);
  useEffect(() => {
    if (globalState?.profileDetail?.role === 'SUPERADMIN') setPage(true);
    else setPage(false);
  }, [globalState?.profileDetail?.role]);
  if (page === null) {
    return <ButtonLoader />;
  }
  if (page) {
    return <Accounts />;
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}

export default Index;
