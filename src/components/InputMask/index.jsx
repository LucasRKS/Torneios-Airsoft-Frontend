/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useRef, useEffect } from 'react';
import ReactInputMask from 'react-input-mask';
import { useField } from '@unform/core';

export default function InputMask({
  name,
  className,
  label,
  ...rest
}) {
  const inputRef = useRef(null);
  const {
    fieldName, registerField, defaultValue, error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <ReactInputMask
        ref={inputRef}
        id={name}
        defaultValue={defaultValue}
        className={`form-control ${className}`}
        {...rest}
      />
      {error && (
        <div className="row" aria-labelledby={name}>
          <div className="col-md-12">
            <small className="text-danger">{error}</small>
          </div>
        </div>
      )}
    </div>
  );
}
