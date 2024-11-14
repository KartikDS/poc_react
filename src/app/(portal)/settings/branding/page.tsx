// Components
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import Branding from '@/Layout/Settings/Branding';
import { getSettingsDetail } from '@/Layout/Settings/service';
import { KEYPAIR } from '@/types/interfaces';
import { getDecodedToken } from '@/utils/helpers';

export const metadata: Metadata = {
  title: 'Branding',
  description: 'Branding',
};

async function fetchSettings() {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');
  const { isValid } = getDecodedToken(token?.value as unknown as string);

  if (!isValid) return;
  const branding = (await getSettingsDetail(
    {
      payload: {
        model: 'branding',
      },
    },
    token?.value as string,
  )) as { columnData: KEYPAIR };

  return branding;
}

async function Index() {
  const branding = await fetchSettings();
  if (!branding) return;
  return (
    <>
      <Branding branding={branding} />
    </>
  );
}

export default Index;
