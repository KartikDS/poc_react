// Components
import { Metadata } from 'next';

import Accounts from '@/Layout/Settings/Accounts/';

export const metadata: Metadata = {
  title: 'Settings - Accounts',
  description: 'Settings',
};

async function Index() {
  return <Accounts />;
}

export default Index;
