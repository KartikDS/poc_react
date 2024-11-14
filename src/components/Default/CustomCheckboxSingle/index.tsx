import React, { InputHTMLAttributes, useMemo } from 'react';

interface PROPS extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  type: 'checkbox' | 'radio';
  label: string;
  error?: string;
}

const CustomCheckboxSingle = ({ label, className, error, type, name, ...props }: PROPS) => {
  const isError = useMemo(
    () => ({
      inValid: error ? 'is-invalid' : '',
      message: error ? error : '',
    }),
    [error],
  );
  return (
    <React.Fragment>
      <div className={isError.inValid}>
        <input type={type} id={name} name={name} className={`${className}`} {...props} />
        <label className={className} htmlFor={`${name}`}>
          {label}
        </label>
      </div>
      <div className="invalid-feedback">{error}</div>
    </React.Fragment>
  );
};

export default CustomCheckboxSingle;
