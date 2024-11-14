import { InputHTMLAttributes } from 'react';

interface PROPS extends InputHTMLAttributes<HTMLInputElement> {
  isError: string;
}
interface PROPSTEXTAREA extends InputHTMLAttributes<HTMLTextAreaElement> {
  isError: string;
}
export const Simple = ({ isError, className, ...otherProps }: PROPS) => {
  return <input maxLength={100} className={`form-control ${className} ${isError}`} {...otherProps} />;
};

export const Textarea = ({ isError, className, ...otherProps }: PROPSTEXTAREA) => {
  return <textarea maxLength={500} rows={6} className={`form-control ${className} ${isError}`} {...otherProps} />;
};
