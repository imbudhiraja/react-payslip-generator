import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (props) => {
  const {
    error, maxLength, name, onChange, title, type, value,
  } = props;
  return (
    <div className="inputContainer">
      <label className="title">
        {title}
      </label>
      <input
        className="textInput"
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        name={name}
        required
      />
      { error
      && (
      <span className="error-message">
        {error}
      </span>
      )}
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(null),
  ]),
};

TextInput.defaultProps = {
  title: '',
  type: 'number',
  value: '',
  onChange: () => { },
  maxLength: 25,
  name: '',
  error: null,
};

TextInput.displayName = 'TextInput';

export default TextInput;
