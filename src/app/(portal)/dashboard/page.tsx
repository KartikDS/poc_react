// Components
import { Metadata } from 'next';

import Dashboard from '@/Layout/Dashboard';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

function Index() {
  return redirect('/settings/accounts');
  // return <Dashboard />;
}

export default Index;
