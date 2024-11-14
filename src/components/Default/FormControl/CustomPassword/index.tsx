import Image from 'next/image';
import { Fragment, InputHTMLAttributes, useMemo, useState } from 'react';

interface PROPS extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  icon?: string;
  error?: string | undefined;
}

const CustomPassword = ({ icon, error = '', ...otherProps }: PROPS) => {
  const [passHidden, setPassHidden] = useState<boolean>(true);
  const errorMessage = useMemo(() => {
    return {
      error: error ? 'is-invalid' : '',
      message: error,
    };
  }, [error]);

  return (
    <Fragment>
      <div className={`InputWithIcon PasswordWithIcon ${errorMessage.error}`}>
        {icon ? <Image src={icon} alt="Icon" className="input-icon" width={24} height={24} /> : ''}
        <input
          type={passHidden ? 'password' : 'text'}
          maxLength={100}
          className={`form-control ${errorMessage.error}`}
          {...otherProps}
        />
        <Image
          src={`/assets/images/${passHidden ? 'eye-slash.svg' : 'eye.svg'}`}
          alt="Icon"
          className="input-icon"
          role="button"
          width={24}
          height={24}
          onClick={() => {
            setPassHidden(preVal => !preVal);
          }}
        />
      </div>
      <div className="invalid-feedback">{errorMessage.message}</div>
    </Fragment>
  );
};

export default CustomPassword;
