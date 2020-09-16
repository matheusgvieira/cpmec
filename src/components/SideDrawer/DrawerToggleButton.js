import React from 'react';
import PropTypes from 'prop-types';

import './DrawerToggleButton.scss';

const drawerToggleButton = ({ click }) => (
  <button className="toggle-button" type="button" onClick={click}>
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
  </button>
);

drawerToggleButton.propTypes = {
  click: PropTypes.func.isRequired,
};

export default drawerToggleButton;
