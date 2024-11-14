import React, { useEffect, useMemo, useState } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import CustomDateInput from './Component/CustomeDateInput';

interface PROPS extends Omit<ReactDatePickerProps, 'onChange' | 'value'> {
  value?: string | null;
  defaultValue?: string;
  onChange: (value: any) => void;
  error?: string;
}

const DatePicker = ({ onChange, dateFormat, defaultValue, value = null, error, placeholderText, ...props }: PROPS) => {
  const [selectDate, setSelectDate] = useState<Date | null>(null);

  const isError = useMemo(() => {
    return {
      isValid: error ? 'is-invalid' : '',
      message: error,
    };
  }, [error]);

  useEffect(() => {
    setSelectDate(value ? new Date(value) : null);
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      const date = new Date(defaultValue);
      if (!isNaN(date.getTime())) {
        setSelectDate(date);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={isError.isValid}>
        <ReactDatePicker
          dateFormat={dateFormat ?? 'MM/dd/yyyy'}
          className="form-control"
          calendarClassName="calendardatepicker"
          customInput={
            <CustomDateInput placeholderText={placeholderText ?? 'MM/DD/YYYY'} isInvalid={isError.isValid} />
          }
          onChange={date => {
            if (!value) setSelectDate(date);
            onChange(date?.toISOString());
          }}
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown
          {...(selectDate ? { selected: selectDate } : {})}
          {...props}
        />
      </div>
      <div className="invalid-feedback">{isError.message}</div>
      <style>
        {`.react-datepicker-wrapper{
              width:100%
          }
          .react-datepicker-popper {
              z-index:999;
            // inset: auto auto auto auto !important;
            // position: absolute;
            // inset: inherit !important;
            // transform: none !important;
          }
        `}
      </style>
    </>
  );
};

export default DatePicker;
