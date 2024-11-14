'use client';

import React, { memo } from 'react';
// import { Button } from 'react-bootstrap';

import styles from '@/styles/Components/Container/SubHeader.module.scss';
// import { useRequest } from '@/components/App';
// import { confirmDialog } from '@/utils/helpers';

function EnquiryHeader(props: { title: string; totalRecords: number; handleOpen: () => void }) {
  // const { request } = useRequest();
  // const exportToCSV = async () => {
  //   const moduleName = 'enquiries';

  //   const confirm = await confirmDialog('Are you sure you want to export Table to CSV?');
  //   if (!confirm) return;
  //   await request('exportTable', { moduleName });
  // };

  return (
    <>
      <div className={styles.SubHeadMainSettings}>
        <div className={styles.SubHead}>
          <div className={styles.CustomerCount}>
            <div className="rightPenalTitle">{props.title}</div>
          </div>
          {/* <div>
            <Button className="OutlineBtn SmBtn" onClick={exportToCSV}>
              <i className="fa-solid fa-download"></i> Export
            </Button>{' '}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default memo(EnquiryHeader);
