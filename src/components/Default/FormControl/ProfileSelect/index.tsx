import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';

import styles from '@/styles/Components/Profile/Profile.module.scss';
interface PROPS {
  image: string;
  name: string;
  onChange?: (name: string, value: File) => void;
  accept?: string;
  error?: string;
  isError?: boolean;
}

const ProfileSelect = ({ image, name, onChange, accept = '.*', error = '', isError = false }: PROPS) => {
  const [imgPreview, setImgPreview] = useState<string>(image);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setImgPreview(URL.createObjectURL(event.target.files[0]));
      if (onChange) {
        onChange(name, event.target.files[0]);
      }
    }
  };
  return (
    <React.Fragment>
      {imgPreview ? (
        <div className={`${styles.ProfileImg} ${isError ? 'is-invalid' : ''}`}>
          <Image
            src={imgPreview}
            alt="Downtime"
            width={150}
            height={150}
            className="me-2"
            onErrorCapture={() => setImgPreview('/assets/images/file-doc.svg')}
          />
          <input
            type="file"
            name={name}
            className={styles.fileInput}
            onChange={handleChange}
            accept={accept} // Specify accepted file types if needed
          />
          <span className={styles.profileEditIcon}>
            <label htmlFor="file-input" className={styles.browseButton}>
              <Image src="/assets/images/editIcon.png" alt="Downtime" width={35} height={35} className="me-2" />
            </label>
          </span>
        </div>
      ) : (
        <div className={`${styles.uploadPhoto} ${styles.ProfileImg} ${isError ? 'is-invalid' : ''}`}>
          <span>
            <Image src="/assets/images/uploadAdd.png" alt="Downtime" width={25} height={25} layout="intrinsic" />
            <input
              type="file"
              name={name}
              className={styles.fileInput}
              onChange={handleChange}
              accept={accept} // Specify accepted file types if needed
            />
          </span>
        </div>
      )}

      {isError ? <div className="invalid-feedback">{error}</div> : null}
    </React.Fragment>
  );
};

export default ProfileSelect;
