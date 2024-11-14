import { forwardRef } from 'react';

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholderText: string;
  isInvalid: string;
}

const CustomDateInput = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const { value, onClick, placeholderText, isInvalid } = props;
  return (
    <input
      ref={ref}
      onClick={onClick}
      defaultValue={value}
      className={`form-control ${isInvalid}`}
      readOnly
      placeholder={placeholderText}
    />
  );
});

CustomDateInput.displayName = 'CustomDateInput';

export default CustomDateInput;
