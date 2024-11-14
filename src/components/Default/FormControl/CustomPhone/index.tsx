import React, { InputHTMLAttributes, useEffect, useState } from 'react';

import CustomInput from '../CustomInput';

interface PROPS extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  icon?: string;
  error?: string | undefined;
  onChange?: (value: string) => void;
}

const CustomPhone = ({ defaultValue, value, onChange: handelChange, ...otherProps }: PROPS) => {
  const [phone, setPhone] = useState<string>((defaultValue ?? '') as string);
  useEffect(() => {
    if (value !== undefined) {
      setPhone(value as string);
    }
  }, [value]);
  return (
    <CustomInput
      value={phone}
      maxLength={14}
      onChange={e => {
        const allowedChars = /[^0-9+]/g;
        const newValue = e.target.value.replace(allowedChars, '');
        setPhone(newValue);
        if (handelChange) {
          handelChange(newValue);
        }
      }}
      {...otherProps}
    />
  );
};

export default CustomPhone;
