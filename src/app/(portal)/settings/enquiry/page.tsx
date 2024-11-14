// Components
import { Metadata } from 'next';

import Enquiry from '@/Layout/Settings/Enquiry';

export const metadata: Metadata = {
  title: 'Settings - Enquiry',
  description: 'Settings Enquiry',
};

function Index() {
  return (
    <>
      <Enquiry />
    </>
  );
}

export default Index;
