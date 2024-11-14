'use client';

import Image from 'next/image';
import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

import styles from '@/styles/Components/Container/SubHeader.module.scss';

function IndustryHeader(props: { title: string }) {
  return (
    <>
      <div className={styles.SubHeadMainSettings}>
        <div className={styles.SubHead}>
          <div className={styles.CustomerCount}>
            <div className="rightPenalTitle">{props.title}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(IndustryHeader);
