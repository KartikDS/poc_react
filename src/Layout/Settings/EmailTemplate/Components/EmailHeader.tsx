'use client';

import Image from 'next/image';
import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

import styles from '@/styles/Components/Container/SubHeader.module.scss';

function EmailHeader(props: { title: string; totalRecords: number; handleOpen: () => void }) {
  return (
    <>
      <div className={styles.SubHeadMainSettings}>
        <div className={styles.SubHead}>
          <div className={styles.CustomerCount}>
            <div className="rightPenalTitle">{props.title}</div>
          </div>

          <div>
            <Button className="customBtn SmBtn" onClick={() => props.handleOpen()}>
              <Image alt="add" height={16} width={16} src="/assets/icons/add.svg" /> Add a new email template
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(EmailHeader);
