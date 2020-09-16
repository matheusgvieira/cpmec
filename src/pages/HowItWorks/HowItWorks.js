import React from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';

import howItWorks from '../../assets/images/howitwork.png';

import './HowItWork.scss';

export default function HowItWorks() {
  const history = useHistory();
  return (
    <div className="how-works-container">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="subtitle">
          <p>Siga os seguinte passos...</p>
          <button type="button" onClick={() => history.push('/faq')}>
            Tire sua dúvidas aqui!
          </button>
        </div>
        <img src={howItWorks} alt="Como funciona" />
      </main>
    </div>
  );
}
