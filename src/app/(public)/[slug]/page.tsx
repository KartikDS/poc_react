import React from 'react';

import CmsPage from '@/Layout/Public/Cms';

const page = ({ params }: { params: { slug: string } }) => {
  return <CmsPage slug={params.slug} />;
};

export default page;
