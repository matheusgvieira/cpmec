import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import sicoobIcon from '../../assets/sicoobIcon.png';
import Church from '../../assets/church.png';

import './Offer.scss';
import '../../global.scss';

/* eslint-disable */
export default function Offer() {
  return (
    <div className="offer-container">
      <header>
        <Navbar />
      </header>

      <main>
        <div className="title">
          <h1>Ofertar</h1>
        </div>
        <div className="main-text">
          <p>
            Faça sua doação através de uma das nossas contas bancárias. Você pode fazê-lo através de
            <b> depósito </b> ou
            <b> transferência bancária.</b>
          </p>
        </div>

        <div className="data-bank">
          <div className="bank">
            <div className="bank-content">
              <img src={sicoobIcon} alt="Sicoob" />
              <div className="bank-txt">
                <p>
                  <b>AGÊNCIA:</b> 3233
                </p>
                <p>
                  <b>C/C:</b> 3.512-2
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
                <p>
                  CNPJ: <br /> 32.280.656/0001-00
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
/* eslint-disable */
