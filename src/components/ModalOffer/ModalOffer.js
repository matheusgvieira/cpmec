import React from 'react';
import Modal from 'react-awesome-modal';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import sicoobIcon from '../../assets/sicoobIcon.png';
import Church from '../../assets/church.png';
import '../../global.scss';
import './ModalOffer.scss';

/* eslint-disable */
export default function ModalOffer() {
  const [visible, setVisible] = React.useState(false);

  function openModal() {
    setVisible(true);
  }
  function closeModal() {
    setVisible(false);
  }
  return (
    <div className="modal-offer-container">
      <button type="button" onClick={openModal} className="button-nav">
        Ofertar
      </button>
      <Modal
        visible={visible}
        width="70%"
        height="425px"
        effect="fadeInDown"
        onClickAway={closeModal}
      >
        <div className="screenModal">
          <div className="offer-title">
            <h1>Ofertar</h1>
            <IconButton onClick={closeModal}>
              <Close />
            </IconButton>
          </div>
          <div className="offer-body">
            <div className="main-text">
              <p>
                Faça sua doação através de uma das nossas contas bancárias. Você pode fazê-lo
                através de
                <b> depósito </b>
                ou
                <b> transferência bancária.</b>
              </p>
            </div>

            <div className="bank">
              <div className="bank-content">
                <img src={sicoobIcon} alt="Banco-Sicoob" />
                <div className="bank-txt">
                  <p>
                    <b>AGÊNCIA: </b>
                    3233
                  </p>
                  <p>
                    <b>C/C: </b>
                    3.512-2
                  </p>
                </div>
              </div>
            </div>
            <div className="data">
              <div className="data-content">
                <img src={Church} alt="Church-Icon" />
                <div className="data-txt">
                  <p>
                    <b>Igreja Um Só Espirito</b>
                  </p>
                  <p>CNPJ: 32.280.656/0001-00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
/* eslint-disable */
