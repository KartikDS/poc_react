// Components
import { Metadata } from 'next';

import Cms from '@/Layout/Settings/Cms';

export const metadata: Metadata = {
  title: 'Settings - Cms',
  description: 'Settings Cms',
};

function Index() {
  return (
    <>
      <Cms />
    </>
  );
}

export default Index;
