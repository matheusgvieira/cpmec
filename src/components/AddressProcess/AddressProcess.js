import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSendAddress } from '../../store/actions/AddressNotified';

import './AddressProcess.scss';

function AddressProcess({ type, children, showAddress, setAddress, inputSendAddress }) {
  /* eslint-disable */
  return (
    <div className="info-notified">
      {!showAddress && (
        <div className="input-radio-notified">
          <>
            <label htmlFor="know">
              <input
                type="radio"
                id="know"
                name={type === 'notificado' ? 'price' : 'gender'}
                onChange={() => setAddress(true)}
              />
              <p>Conheço o {type === 'notificado' ? type : 'notificante'}</p>
            </label>
            <label htmlFor="unknow">
              <input
                type="radio"
                id="unknow"
                name={type === 'notificado' ? 'price' : 'gender'}
                onChange={() => setAddress(false)}
              />
              <p>Desconheço o {type === 'notificado' ? type : 'notificante'}</p>
            </label>
          </>
        </div>
      )}
      {(inputSendAddress || showAddress) && children}
    </div>
  );
}
/* eslint-enable */

function mapStateToProps(state) {
  return {
    inputSendAddress: state.addressNotified.inputSendAddress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAddress(newState) {
      const action = setSendAddress(newState);
      dispatch(action);
    },
  };
}

AddressProcess.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  showAddress: PropTypes.bool.isRequired,
  inputSendAddress: PropTypes.bool.isRequired,
  setAddress: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressProcess);
