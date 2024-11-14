import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface PROPS {
  name: string;
  label?: string;
  preView?: string;
  error?: string;
  isError?: boolean;
  accept?: string;
  fallbackUrl?: string;
  onChange?: (value: File | null) => void;
  disabled?: boolean;
}

const CustomFile = ({
  error,
  isError,
  name,
  onChange,
  preView = '',
  accept = '.*',
  label = 'Upload from Gallery',
  fallbackUrl = '/assets/icons/file-doc.svg',
  disabled = false,
}: PROPS) => {
  const [fileName, setFileName] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [fallback, setFallback] = useState<null | string>(null);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFileName(event.target.files[0].name);
      setPreview(URL.createObjectURL(event.target.files[0]));
      setFallback(null);
      if (onChange) onChange(event.target.files[0]);
    }
  };
  const handleRemoveButton = () => {
    setFileName('');
    setPreview('');
    if (onChange) {
      onChange(null);
    }
  };
  useEffect(() => {
    setPreview(preView);
  }, [preView]);
  return (
    <React.Fragment>
      <div className={`uploadBox ${isError ? 'is-invalid' : ''}`}>
        <div>
          {preview ? (
            <span className="previewImg">
              <a href={preview} target="_blank" rel="noreferrer">
                <Image
                  className="perview_img"
                  src={fallback ?? preview}
                  width={100}
                  height={100}
                  alt="Preview image"
                  onErrorCapture={() => setFallback(fallbackUrl)}
                />
              </a>
              {!disabled ? (
                <span className="close">
                  <Image
                    role="button"
                    src="/assets/icons/cross.svg"
                    width={25}
                    height={25}
                    alt="Cross"
                    onClick={handleRemoveButton}
                  />
                </span>
              ) : null}
            </span>
          ) : (
            <>
              <input
                disabled={disabled}
                type="file"
                name={name}
                className="file-input"
                onChange={handleChange}
                accept={`${accept};capture=camera`} // Specify accepted file types if needed
              />
              <label htmlFor="file-input" className="browse-button">
                <Image src="/assets/images/uploadGallery.png" alt="AdminPanel" width={97} height={53} /> {label}
              </label>
            </>
          )}
        </div>
      </div>
      <p className="d-block">{fileName}</p>
      {isError ? <div className="invalid-feedback">{error}</div> : null}
    </React.Fragment>
  );
};

export default CustomFile;
