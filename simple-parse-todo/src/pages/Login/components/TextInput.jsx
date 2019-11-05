import React, { useState } from 'react';

import './TextInput.scss';

const TextInput = ({ name, type, placeholder, onChange, ...extra }) => {
  const [active, setActive] = useState(false);
  const TextInputCls = `TextInput-Container ${active && 'active'}`;

  const onFocusHandler = () => {
    setActive(true);
  };

  const onBlurHandler = () => {
    setActive(false);
  };

  return (
    <div className={TextInputCls}>
      <input name={name} className="TextInput" type={type} placeholder={placeholder} onFocus={onFocusHandler} onBlur={onBlurHandler} onChange={onChange} {...extra}/>
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
};

export default TextInput;