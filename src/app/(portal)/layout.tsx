// Components
import { Metadata } from 'next';
import React from 'react';

import Container from '@/Layout/Container';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Settings',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default Layout;
