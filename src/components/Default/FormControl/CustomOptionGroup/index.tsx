import { ChangeEvent, Fragment, useMemo } from 'react';
import Form from 'react-bootstrap/Form';

// interface OPTIONS_PROPS {
//   label: string;
//   value: string | number;
// }

type Option = string | { [key: string]: string | number };

interface PROPS {
  type: 'radio' | 'checkbox';
  name: string;
  className?: string;
  options: Array<Option>;
  optionKey?: { value: string; label: string };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  error?: string;
  isChecked?: Array<string | number>;
  checked?: boolean;
  id?: string;
  disabled?: boolean;
}
const OptionGroup = ({
  type,
  name,
  className,
  options,
  optionKey = { value: 'value', label: 'label' },
  onChange,
  isError = false,
  error = '',
  isChecked = [],
  checked = false,
  disabled = false,
  id = '',
}: PROPS) => {
  const errorData = useMemo(() => {
    return {
      error: isError ? 'is-invalid' : '',
      message: error ?? '',
    };
  }, [isError, error]);
  return (
    <Fragment>
      <div className={`mb-3 ${errorData.error}`}>
        <div className={className ?? 'd-flex'}>
          {options.map((item, idx) =>
            typeof item === 'object' ? (
              <Form.Check
                disabled={disabled}
                className="me-3"
                name={name}
                type={type}
                label={item[optionKey.label]}
                value={item[optionKey.value]}
                id={`${name}-${type}${id}-${idx}`}
                key={`${name}-${type}-${idx}`}
                onChange={onChange}
                {...(checked
                  ? { checked: isChecked.includes(item[optionKey.value]) }
                  : { defaultChecked: isChecked.includes(item[optionKey.value]) })}
              />
            ) : (
              <Form.Check
                disabled={disabled}
                className="me-3"
                name={name}
                type={type}
                label={item}
                value={item}
                id={`${name}-${type}-${idx}`}
                key={`${name}-${type}-${idx}`}
                onChange={onChange}
                defaultChecked={isChecked.includes(item)}
              />
            ),
          )}
        </div>
      </div>
      <div className="invalid-feedback">{errorData.message}</div>
    </Fragment>
  );
};

export default OptionGroup;
