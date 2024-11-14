'use client';

import Image from 'next/image';
import React, { memo } from 'react';

// import { useRequest } from '@/components/App';
import styles from '@/styles/Components/Container/SubHeader.module.scss';
// import { confirmDialog } from '@/utils/helpers';

function UserHeader(props: { title: string; totalRecords: number; handleOpen: () => void }) {
  // const { request } = useRequest();
  // const exportToCSV = async () => {
  //   const moduleName = 'users';
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
          <div>
            {/* <button className="btn OutlineBtn SmBtn" onClick={exportToCSV}>
              <i className="fa-solid fa-download"></i> Export
            </button>{' '} */}
            <button className="btn customBtn SmBtn" onClick={() => props.handleOpen()}>
              <Image alt="add" height={16} width={16} src="/assets/icons/add.svg" /> Add User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(UserHeader);
