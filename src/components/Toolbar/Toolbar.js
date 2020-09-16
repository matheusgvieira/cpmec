import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import ModalMenu from '../ModalHowItWorks/ModalMenu';
import ModalContato from '../ModalContato/ModalContato';
import ModalOffer from '../ModalOffer/ModalOffer';
import ModalPlans from '../ModalPlans/ModalPlans';
import './Toolbar.scss';
import Logo from '../../assets/logo.png';

export default function toolbar({ drawerClickHandler }) {
  let history = useHistory(); // eslint-disable-line
  function handleClick() {
    history.push('/consultar-processo'); // eslint-disable-line
  }

  return (
    <div className="toolbar">
      <div className="toolbar__navigation">
        <div className="toolbar__logo">
          <Link to="/">
            <img src={Logo} alt="CEPMEC" />
          </Link>
        </div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
          <ul>
            <li>
              <ModalMenu />
            </li>
            <li>
              <ModalPlans />
            </li>
            <li>
              <ModalOffer />
            </li>
            <li>
              <ModalContato />
            </li>
            <li>
              <button type="button" className="seach-process" onClick={handleClick}>
                Consultar Demanda
              </button>
            </li>
          </ul>
        </div>
        <div className="toolbar__toggle-button">
          <DrawerToggleButton click={drawerClickHandler} />
        </div>
      </div>
    </div>
  );
}

toolbar.propTypes = {
  drawerClickHandler: PropTypes.func.isRequired,
};
