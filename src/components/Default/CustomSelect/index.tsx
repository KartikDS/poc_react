import React, { InputHTMLAttributes, useMemo } from 'react';

interface KEYVALUE {
  [key: string]: string;
}

interface PROPS extends InputHTMLAttributes<HTMLSelectElement> {
  options: KEYVALUE[];
  error?: string;
}

const CustomSelect = ({ name, options, className, error, placeholder, ...props }: PROPS) => {
  const isError = useMemo(
    () => ({
      inValid: error ? 'is-invalid' : '',
      message: error ? error : '',
    }),
    [error],
  );
  return (
    <React.Fragment>
      <select name={name} className={`form-control ${className} ${isError.inValid}`} {...props}>
        <option value="">{placeholder || 'Select an option'}</option>
        {options.map((option, index) => (
          <option key={`${name}_${index}`} value={option.key}>
            {option.key as string}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{error}</div>
    </React.Fragment>
  );
};

export default CustomSelect;
