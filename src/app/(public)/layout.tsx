// Components
import { Metadata } from 'next';
import React from 'react';

import PublicHeader from '@/Layout/Public/Component/Header';
import PublicFooter from '@/Layout/Public/Component/Footer';

export const metadata: Metadata = {
  title: 'Cms Pages',
  description: 'Cms Pages',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="publicPage">
      <PublicHeader />
      <div className="container publicContainer my-3">{children}</div>
      <PublicFooter />
    </div>
  );
};

export default Layout;
