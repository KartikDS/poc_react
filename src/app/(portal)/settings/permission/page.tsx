// Components
import { Metadata } from 'next';

import Permission from '@/Layout/Settings/Permission';

export const metadata: Metadata = {
  title: 'Settings - Permission',
  description: 'Settings Permission',
};

function Index() {
  return <Permission />;
}

export default Index;
