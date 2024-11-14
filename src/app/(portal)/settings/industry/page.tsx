// Components
import { Metadata } from 'next';

import Industry from '@/Layout/Settings/Industry';

export const metadata: Metadata = {
  title: 'Settings - Industry',
  description: 'Settings Industry',
};

function Index() {
  return <Industry />;
}

export default Index;
