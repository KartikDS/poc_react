// Components
import { Metadata } from 'next';

import Field from '@/Layout/Settings/Field';

export const metadata: Metadata = {
  title: 'Settings - Field',
  description: 'Settings Field',
};

function Index() {
  return <Field />;
}

export default Index;
