// Components
import { Metadata } from 'next';

import ResetPassword from '@/Layout/Auth/ResetPassword';

export const metadata: Metadata = {
  title: 'Create Password',
  description: 'Create Password to Portal',
  keywords: 'Create Password',
};

async function Index() {
  return <ResetPassword type="new" />;
}

export default Index;
