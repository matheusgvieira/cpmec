import React from 'react';
import PropTypes from 'prop-types';

import './Backdrop.scss';

const backdrop = ({ click }) => (
  <div className="backdrop" onClick={click} onKeyPress={click} role="button" tabIndex="0" />
);

backdrop.propTypes = {
  click: PropTypes.func.isRequired,
};

export default backdrop;
