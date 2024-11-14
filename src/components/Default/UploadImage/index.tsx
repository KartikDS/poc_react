'use client';
import React, { InputHTMLAttributes, useMemo, useState } from 'react';
import { Image } from 'react-bootstrap';

interface PROPS extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  error?: string;
  defaultImage?: string;
  onChange?: (files: FileList | null) => void;
}

function Index({ name, defaultImage = '', className, error, onChange, ...props }: PROPS) {
  const [image, setImage] = useState<{
    preview: File | undefined;
    raw: File | undefined;
  }>({
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
      <label
        htmlFor="upload-button"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {image.preview ? (
          <Image
            className="circular-image"
            src={URL.createObjectURL(image.preview)}
            alt="dummy"
            width="40"
            height="40"
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Image className="circular-image" alt="uploadIcon" height={40} width={40} src={defaultImage} />
          </div>
        )}

        <div>Upload icon</div>
      </label>
      <input
        name={name}
        className={`form-control ${className} ${isError.inValid}`}
        type="file"
        id="upload-button"
        accept="image/png, image/gif, image/jpeg, image/svg+xml"
        style={{ display: 'none' }}
        onChange={handleChange}
        {...props}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}

export default Index;
