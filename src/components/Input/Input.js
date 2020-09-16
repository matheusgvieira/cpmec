import React, { useState } from 'react';
import InputMask from 'react-input-mask';

import './Input.scss';

import PropTypes from 'prop-types';
import { VisibilityOff, Visibility } from '@material-ui/icons';

function Input({ label, type, name, mask, ...rest }) {
  const [toggleInput, setToggleInput] = useState(false);
  const [toggleInputText, setToggleInputText] = useState('password');

  function handleTogglePass() {
    setToggleInput(!toggleInput);
    setToggleInputText(toggleInputText === 'text' ? 'password' : 'text');
  }

  return (
    <div className="input-block">
      <label htmlFor={name}>
        <span>{label}</span>
        {type === 'password' ? (
          <div className="password-button-input">
            <InputMask type={toggleInputText} name={name} id={name} {...rest} />
            {toggleInput ? (
              <button type="button" onClick={handleTogglePass}>
                <VisibilityOff />
              </button>
            ) : (
              <button type="button" onClick={handleTogglePass}>
                <Visibility />
              </button>
            )}
          </div>
        ) : (
          <InputMask type={type} name={name} id={name} mask={mask} {...rest} />
        )}
      </label>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Input;
