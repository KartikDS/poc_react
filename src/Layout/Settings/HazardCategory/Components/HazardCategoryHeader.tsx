'use client';

import Image from 'next/image';
import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

import styles from '@/styles/Components/Container/SubHeader.module.scss';

function IndustryHeader(props: {
  title: string;
  totalRecords: number;
  handleOpen: () => void;
  fieldName: string | null;
  icon: string | null;
}) {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  const src = `/images/${props?.icon}`;
  return (
    <>
      <div className={styles.SubHeadMainSettings}>
        <div className={styles.SubHead}>
          <div className={styles.CustomerCount}>
            <div className="rightPenalTitle">{props.title}</div>
            <div style={{ marginTop: '8px', fontSize: '14px', color: '#333', fontWeight: 'normal' }}>
              Field Name: {props.fieldName}
            </div>
            <div style={{ marginTop: '8px', fontSize: '14px', color: '#333', fontWeight: 'normal' }}>
              Field Icon:
              <img src={src} alt="Industry Icon" style={{ marginLeft: '4px', width: '40px', height: '40px' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div>
              <Button className="customBtn SmBtn" onClick={() => props.handleOpen()}>
                <Image alt="add" height={16} width={16} src="/assets/icons/add.svg" /> Add a new Category
              </Button>
            </div>
            <div>
              <Button className="customBtn SmBtn" onClick={handleBackClick}>
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(IndustryHeader);
