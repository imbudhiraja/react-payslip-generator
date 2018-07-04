import React from 'react';
import PropTypes from 'prop-types';

const WelcomeHeader = (props) => {
  const { message } = props;

  return (
    <h1 className="header">
      {message}
    </h1>
  );
};

WelcomeHeader.defaultProps = {
  message: '',
};

WelcomeHeader.propTypes = {
  message: PropTypes.string,
};

WelcomeHeader.displayName = 'WelcomeHeader';

export default WelcomeHeader;
