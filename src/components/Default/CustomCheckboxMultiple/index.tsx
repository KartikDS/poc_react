import React, { ChangeEvent, useMemo } from 'react';

type VALUE = string | number;

interface PROPS {
  error?: string;
  type: 'checkbox' | 'radio';
  heading?: string;
  checked?: boolean;
  isChecked?: VALUE[];
  options: { [key: string]: VALUE }[];
  optionKey?: {
    label: string;
    value: string;
  };
  name?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckboxMultiple = ({
  className,
  error,
  type,
  options,
  checked = false,
  isChecked = [],
  onChange,
  name,
  optionKey = {
    value: 'value',
    label: 'key',
  },
}: PROPS) => {
  const isError = useMemo(
    () => ({
      inValid: error ? 'is-invalid' : '',
      message: error ? error : '',
    }),
    [error],
  );
  return (
    <>
      {options.map((option, index) => (
        <div key={`${name}_${index}`}>
          <input
            type={type}
            id={`${name}_${index}`}
            name={name}
            className={`${isError.inValid} ${className}`}
            style={error ? { border: '1px solid #dc3545' } : {}}
            value={option[optionKey.value]}
            onChange={e => {
              if (onChange) {
                onChange(e);
              }
            }}
            {...(checked
              ? { checked: isChecked.includes(option[optionKey.value]) }
              : {
                  defaultChecked: isChecked.includes(option[optionKey.value]),
                })}
          />
          <label className={className} htmlFor={`${name}_${index}`}>
            {option[optionKey.label] as string}
          </label>
        </div>
      ))}
      <div className="invalid-feedback d-block">{error}</div>
    </>
  );
};

export default CustomCheckboxMultiple;
