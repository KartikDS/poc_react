'use client';

import Image from 'next/image';
import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

import { useRequest } from '@/components/App';
import styles from '@/styles/Components/Container/SubHeader.module.scss';
import { confirmDialog } from '@/utils/helpers';

function CategoryHeader(props: { title: string; handleOpen: () => void }) {
  const { request } = useRequest();
  const exportToCSV = async () => {
    const moduleName = 'categories';

    const confirm = await confirmDialog('Are you sure you want to export Table to CSV?');
    if (!confirm) return;
    await request('exportTable', { moduleName });
  };

  return (
    <>
      <div className={styles.SubHeadMainSettings}>
        <div className={styles.SubHead}>
          <div className={styles.CustomerCount}>
            <div className="rightPenalTitle">{props.title}</div>
          </div>
          <div>
            <Button className="OutlineBtn SmBtn" onClick={exportToCSV}>
              <i className="fa-solid fa-download"></i> Export
            </Button>{' '}
            <Button className="customBtn SmBtn" onClick={() => props.handleOpen()}>
              <Image alt="add" height={16} width={16} src="/assets/icons/add.svg" /> Add a new Category
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(CategoryHeader);
