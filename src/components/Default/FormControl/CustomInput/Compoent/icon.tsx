import Image from 'next/image';
import { InputHTMLAttributes } from 'react';

interface PROPS extends InputHTMLAttributes<HTMLInputElement> {
  icon: string;
  isError: string;
}
const Icon = ({ icon, isError, ...otherProps }: PROPS) => {
  return (
    <div className={`InputWithIcon ${isError}`}>
      <Image src={icon} alt="Icon" className="input-icon" width={24} height={24} />
      <input maxLength={100} className={`form-control ${isError}`} {...otherProps} />
    </div>
  );
};

export default Icon;
