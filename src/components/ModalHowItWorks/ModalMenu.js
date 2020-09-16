import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from 'react-awesome-modal';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import howItWorks from '../../assets/images/howitwork.png';

import '../../global.scss';
import './ModalMenu.scss';

export default function ModalMenu() {
  const [visible, setVisible] = useState(false);
  const [dimensionsStyle, setDimensionsStyle] = useState({
    width: '60%',
    height: '92%',
  });
  const history = useHistory();

  useEffect(() => {
    if (window.screen.width > 1400 && window.screen.width < 1700) {
      setDimensionsStyle({
        width: '75%',
        height: '70%',
      });
    }
    if (window.screen.width > 1700) {
      setDimensionsStyle({
        width: '75%',
        height: '80%',
      });
    }
  }, []);

  return (
    <div className="modal-menu-container">
      <button type="button" onClick={() => setVisible(true)} className="button-nav">
        Como Funciona?
      </button>
      <Modal
        visible={visible}
        width={dimensionsStyle.width}
        height={dimensionsStyle.height}
        effect="fadeInDown"
        onClickAway={() => setVisible(false)}
      >
        <div className="screenModal">
          <div className="title-how">
            <h1>Como Funciona ?</h1>
            <div className="iconButton">
              <IconButton onClick={() => setVisible(false)}>
                <Close />
              </IconButton>
            </div>
          </div>
          <div className="subtitle">
            <p>Siga os seguinte passos...</p>
            <button type="button" onClick={() => history.push('/faq')}>
              Tire sua dúvidas aqui!
            </button>
          </div>
          <div className="paper">
            <img src={howItWorks} alt="img-howItWorks" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
