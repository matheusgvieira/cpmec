import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import './SideDrawer.scss';

import Logo from '../../assets/logo.png';

const sideDrawer = ({ show }) => {
  let drawerClasses = 'side-drawer';
  let history = useHistory(); // eslint-disable-line
  if (show) {
    drawerClasses = 'side-drawer open';
  }
  function handleClick() {
    history.push('/consultar-processo'); // eslint-disable-line
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <img src={Logo} alt="Logo-CPMEC" />
        <li>
          <Link to="/como-funciona">Como Funciona</Link>
        </li>
        <li>
          <Link to="/planos">Planos</Link>
        </li>
        <li>
          <Link to="/ofertar">Ofertar</Link>
        </li>
        <li>
          <Link to="contato">Contato</Link>
        </li>
        <li>
          <button type="button" onClick={handleClick} className="button-consult">
            Consultar Demanda
          </button>
        </li>
      </ul>
    </nav>
  );
};

sideDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default sideDrawer;
