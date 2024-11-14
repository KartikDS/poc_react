// Components
import { Metadata } from 'next';

import EmailTemplate from '@/Layout/Settings/EmailTemplate';

export const metadata: Metadata = {
  title: 'Settings - Email Template',
  description: 'Settings Email Template',
};

function Index() {
  return (
    <>
      <EmailTemplate />
    </>
  );
}

export default Index;
