import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  role?: 'checkbox' | 'switch';
  isError?: boolean;
  label: string;
  id?: string;
  error?: string;
  isChecked?: boolean;
  justifyContent?: string;
}

const CustomCheckbox = ({
  id,
  isError,
  label,
  role = 'checkbox',
  isChecked,
  justifyContent,
  ...otherProps
}: CheckboxProps) => {
  return (
    <div
      style={{ display: 'flex', gap: '10px', justifyContent: justifyContent ?? 'flex-end' }}
      className="form-check form-switch"
    >
      <label className="me-5">{label ? label : ''}</label>
      <input
        id={id}
        type="checkbox"
        role={role}
        className={`form-check-input ${isError}`}
        checked={isChecked}
        {...otherProps}
      />
    </div>
  );
};

export default CustomCheckbox;
