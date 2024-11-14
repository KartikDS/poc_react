'use client';
import React, { useEffect, useMemo, useState } from 'react';

import { useLoading, useRequest } from '@/components/App';
import { CMS_LIST } from '@/Layout/Settings/Cms/interface';

const CmsPage = ({ slug }: { slug?: string }) => {
  const [data, setData] = useState<null | CMS_LIST>(null);
  const { ButtonLoader } = useLoading();
  const { request, loading } = useRequest();
  const getData = async () => {
    const { data } = (await request(
      'GET_CMS',
      {},
      {
        slug,
      },
    )) as { data: CMS_LIST };
    setData(data);
  };

  const loadingPage = useMemo(() => {
    if (loading.GET_CMS_LOADING === undefined) {
      return true;
    }
    return loading.GET_CMS_LOADING;
  }, [loading.GET_CMS_LOADING]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingPage) {
    return <ButtonLoader />;
  }
  return (
    <>
      <h1 className="text-center">{data?.title}</h1>
      {data?.content ? <span dangerouslySetInnerHTML={{ __html: data.content }} /> : null}
    </>
  );
};

export default CmsPage;
