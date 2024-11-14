// Components
import { Metadata } from 'next';

import HazardCategory from '@/Layout/Settings/HazardCategory';

export const metadata: Metadata = {
  title: 'Settings - Category',
  description: 'Settings Category',
};

function Index() {
  return <HazardCategory />;
}

export default Index;
