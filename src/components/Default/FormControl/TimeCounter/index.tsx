import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Timer from './Components/Timer';
import style from './style.module.scss';

interface TIME_DATA {
  hour: number;
  min: number;
}

interface RETURN_DATA {
  name: string;
  value: TIME_DATA;
}

interface PROPS {
  name: string;
  onChange: (data: RETURN_DATA) => void;
  className?: string;
  value?: TIME_DATA;
  disabled?: boolean;
}

const TimeCounter = ({ name, onChange, ...otherProps }: PROPS) => {
  const [timer, settimer] = useState<TIME_DATA>(
    otherProps.value ?? {
      hour: 0,
      min: 0,
    },
  );
  const onChangeTime = (type: string, time: number) => {
    settimer({ ...(timer ?? {}), [type]: time });
  };

  useEffect(() => {
    onChange({ name, value: timer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);
  return (
    <div className={`${style.timeEstimate} ${otherProps.className ?? ''}`}>
      <Timer disabled={!!otherProps.disabled} getTime={onChangeTime} type="hour" value={otherProps.value?.hour} />
      <div className={style.DotImg}>
        <Image src="/assets/images/timeDot.png" alt="Downtime" width={6} height={20} layout="intrinsic" />
      </div>
      <Timer disabled={!!otherProps.disabled} getTime={onChangeTime} type="min" value={otherProps.value?.min} />
    </div>
  );
};

export default TimeCounter;
