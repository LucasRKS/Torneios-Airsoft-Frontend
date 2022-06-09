/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useRef, useEffect } from 'react';
import ReactSelect, {
} from 'react-select';
import { useField } from '@unform/core';

export default function Select({ name, ...rest }) {
  const selectRef = useRef(null);

  const {
    fieldName, defaultValue, registerField, error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <div className="form-group">
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
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
