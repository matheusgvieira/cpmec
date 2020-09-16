import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import Preloader from '../../assets/preloader.gif';
import Logo from '../../assets/logo.png';
import '../../global.scss';
import './ModalLoader.scss';
import PropTypes from 'prop-types'; //eslint-disable-line

export default function ModalLoader(props) {
  const [visible, setVisible] = useState(false);
  const { loading } = props; //eslint-disable-line
  React.useEffect(() => {
    if (loading) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [loading]);
  return (
    <div className="modal-container">
      <Modal visible={visible} width="300" height="200" effect="fadeInDown">
        <div className="screenModal">
          <div className="logo">
            <img src={Logo} alt="img-Logo" />
          </div>
          <div className="paper">
            <img src={Preloader} alt="img-Preloader" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

ModalLoader.protoTypes = {
  loading: PropTypes.bool.isRequired,
};
