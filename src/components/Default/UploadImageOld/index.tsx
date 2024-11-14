'use client';
import React, { InputHTMLAttributes, useMemo, useState } from 'react';
import Image from 'next/image';

interface PROPS extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  error?: string;
  onChange?: (files: FileList | null) => void;
}

function Index({ name, className, error, onChange, ...props }: PROPS) {
  const [image, setImage] = useState<{ preview: File | undefined; raw: File | undefined }>({
    preview: undefined,
    raw: undefined,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length) {
      setImage({
        preview: e.target.files[0],
        raw: e.target.files[0],
      });
      if (onChange) onChange(e.target.files);
    }
  };
  const isError = useMemo(
    () => ({
      inValid: error ? 'is-invalid' : '',
      message: error ? error : '',
    }),
    [error],
  );
  return (
    <div>
      <label htmlFor="upload-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {image.preview ? (
          <Image src={URL.createObjectURL(image.preview)} alt="dummy" width="80" height="80" />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Image alt="uploadIcon" height={80} width={80} src="/assets/icons/upload-cloud-02.svg" />
          </div>
        )}
        <div>Upload image</div>
      </label>
      <input
        name={name}
        className={`form-control ${className} ${isError.inValid}`}
        type="file"
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleChange}
        {...props}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}

export default Index;
