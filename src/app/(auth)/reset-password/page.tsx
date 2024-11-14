// Components
import { Metadata } from 'next';

import ResetPassword from '@/Layout/Auth/ResetPassword';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset Password to Portal',
  keywords: 'Reset Password',
};

async function Index() {
  return <ResetPassword type="reset" />;
}

export default Index;
