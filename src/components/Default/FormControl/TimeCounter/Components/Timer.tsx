import Image from 'next/image';
import { useEffect, useState } from 'react';

import style from '../style.module.scss';

interface PROPS {
  type: 'hour' | 'min';
  value?: number;
  getTime?: (type: 'hour' | 'min', time: number) => void;
  disabled: boolean;
}

type COUNTER_CLICK = 'up' | 'down';

const Timer = ({ type = 'hour', getTime, value, disabled }: PROPS) => {
  const [time, setTime] = useState<number>(0);
  const handleCounterClick = (cType: COUNTER_CLICK) => {
    if (!disabled) {
      setTime(preVal => {
        let count = preVal;
        if (cType === 'up' && (type === 'hour' || (type === 'min' && count < 60))) {
          count += 1;
        } else if (cType === 'down') {
          if (count > 0) {
            count -= 1;
          }
        }
        return count;
      });
    }
  };

  useEffect(() => {
    if (getTime) getTime(type, time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    if (value !== undefined) setTime(value);
  }, [value]);

  return (
    <div className={style.formestimate}>
      <div className={style.increase} onClick={() => handleCounterClick('up')}>
        <Image src="/assets/images/upArrow.png" alt="Downtime" width={10} height={5} />
      </div>
      <input
        disabled={disabled}
        type="number"
        className={`form-control ${style.formControl}`}
        placeholder=" "
        value={Number(time)}
        onChange={e => {
          if (Number(e.target.value) >= 0 && (type === 'hour' || (type === 'min' && Number(e.target.value) <= 60))) {
            const allowedChars = /[^0-9+]/g;
            const newValue = e.target.value.replace(allowedChars, '');
            setTime(Number(newValue));
          }
        }}
      />
      <div className={style.Decrease} onClick={() => handleCounterClick('down')}>
        <Image src="/assets/images/DownArrow.png" alt="Downtime" width={10} height={5} />
      </div>
    </div>
  );
};

export default Timer;
