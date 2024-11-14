import { Fragment, HTMLInputTypeAttribute, InputHTMLAttributes, TextareaHTMLAttributes, useMemo } from 'react';

import Icon from './Compoent/icon';
import { Simple, Textarea } from './Compoent/simple';

interface BaseProps {
  icon?: string;
  error?: string | undefined;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  type?: Exclude<HTMLInputTypeAttribute, 'textarea'>;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseProps {
  type: 'textarea';
}

type PROPS = InputProps | TextareaProps;

const CustomInput = ({ icon, error = '', ...otherProps }: PROPS) => {
  const errorMessage = useMemo(() => {
    return {
      error: error ? 'is-invalid' : '',
      message: error,
    };
  }, [error]);

  return (
    <Fragment>
      {icon ? (
        <Icon icon={icon} isError={errorMessage.error} {...(otherProps as InputHTMLAttributes<HTMLInputElement>)} />
      ) : otherProps?.type === 'textarea' ? (
        <Textarea isError={errorMessage.error} {...(otherProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <Simple isError={errorMessage.error} {...(otherProps as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      <div className="invalid-feedback">{errorMessage.message}</div>
    </Fragment>
  );
};

export default CustomInput;
