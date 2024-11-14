import Image from 'next/image';
import { Fragment, InputHTMLAttributes, useMemo } from 'react';

type Option = string | { [key: string]: string | number };

interface PROPS extends InputHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  optionKey?: { value: string; label: string };
  icon?: string;
  error?: string | undefined;
  disableOption?: boolean;
  skipDisabled?: boolean;
  noPlaceholder?: boolean;
}

const CustomSelect = ({
  icon,
  error = '',
  options = [],
  optionKey = { value: 'value', label: 'label' },
  disableOption = true,
  skipDisabled = false,
  noPlaceholder = false,
  className = '',
  ...otherProps
}: PROPS) => {
  const errorData = useMemo(() => {
    return {
      error: error ? 'is-invalid' : '',
      message: error ?? '',
    };
  }, [error]);

  return (
    <Fragment>
      <div className={`InputWithIcon ${errorData.error}`}>
        {icon ? <Image src={icon} alt="Icon" className="input-icon" width={24} height={24} /> : null}

        <select className={`form-control form-select ${className} ${errorData.error}`} {...otherProps}>
          {!noPlaceholder ? <option value="">{otherProps.placeholder ?? 'Select an Option'}</option> : null}

          {options.map((option, idx) => {
            if (typeof option === 'object') {
              if (option.status !== 0 || !skipDisabled) {
                return (
                  <option
                    disabled={disableOption && option.status === 0}
                    key={`${otherProps.name}-${idx}`}
                    value={option[optionKey.value]}
                  >
                    {option[optionKey.label]}
                  </option>
                );
              }
            } else {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className="invalid-feedback">{errorData.message}</div>
    </Fragment>
  );
};

export default CustomSelect;
