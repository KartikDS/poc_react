// Components
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';
import ForgotPassword from '@/Layout/Auth/ForgotPassword';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Forgot Password to Portal',
  keywords: 'Forgot Password',
};

async function Index() {
  return <ForgotPassword />;
}

export default Index;
