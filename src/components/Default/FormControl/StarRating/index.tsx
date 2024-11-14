import React, { useEffect, useMemo, useState } from 'react';

interface PROPS {
  name?: string;
  onChange?: (name: string, value: number) => void;
  defaultValue?: number;
  error?: string;
}

const StarRating = ({ name, onChange, defaultValue = 0, error }: PROPS) => {
  const [rating, setRating] = useState<number>(defaultValue);
  const [hover, setHover] = useState<number>(defaultValue);
  const isError = useMemo(() => {
    return {
      isError: error ? 'is-invalid' : '',
      message: error,
    };
  }, [error]);

  const isEditable = useMemo(() => {
    return onChange && name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (onChange && name) onChange(name, rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);
  return (
    <>
      <div className={isError.isError}>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => {
                  if (isEditable) setRating(ratingValue);
                }}
                style={{ display: 'none' }}
              />
              <i
                className={`fa-star ${ratingValue <= (hover || rating) ? 'fas text-warning' : 'far'}`}
                style={{ cursor: 'pointer', fontSize: '2rem' }}
                onMouseEnter={() => {
                  if (isEditable) setHover(ratingValue);
                }}
                onMouseLeave={() => {
                  if (isEditable) setHover(0);
                }}
              ></i>
            </label>
          );
        })}
      </div>
      <div className="invalid-feedback">{isError.message}</div>
    </>
  );
};

export default StarRating;
