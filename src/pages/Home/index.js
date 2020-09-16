import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';

import handshake from '../../assets/images/handshake.svg';
import igrejaUse from '../../assets/images/use.svg';
import apure from '../../assets/images/apure.png';
import yasser from '../../assets/images/yasser.png';
import advocacia from '../../assets/images/advocacia.png';
import genesis from '../../assets/images/genesis.png';
import userIcon from '../../assets/user.png';
import mediadorIcon from '../../assets/mediator.png';
import procuradorIcon from '../../assets/attorney.png';

import './styles.scss';
import '../../global.scss';

export default function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <Navbar />
      </header>
      <main>
        <div className="main-block">
          <div className="main-txt">
            <h1>Bem vindo </h1>
            <h1> ao futuro da </h1>
            <h1 className="h1-spotlight"> pacificação </h1>
            <h1> de conflitos</h1>
          </div>
          <div className="main-img">
            <img src={handshake} alt="Projeto-Recomecar" />
          </div>
        </div>

        <div className="sub-block">
          <Link to="/login/usuario">
            <div className="user-button">
              <img src={userIcon} alt="Usuário" />
              <p>Usuário</p>
            </div>
          </Link>
          <Link to="/login/mediador">
            <div className="mediator-button">
              <img src={mediadorIcon} alt="Mediador" />
              <p>Mediador</p>
            </div>
          </Link>
          <Link to="/login/procurador">
            <div className="attorney-button">
              <img src={procuradorIcon} alt="Procurador" />
              <p>Procurador</p>
            </div>
          </Link>
        </div>
      </main>
      <footer>
        <div className="img-footer">
          <img src={igrejaUse} alt="Paceiro Igreja Use" />
        </div>
        <div className="img-footer">
          <img src={apure} alt="Paceiro Apure" />
        </div>
        <div className="img-footer">
          <img src={yasser} alt="Paceiro Yasser" />
        </div>
        <div className="img-footer">
          <img src={advocacia} alt="Paceiro Advocacia" />
        </div>
        <div className="img-footer">
          <img src={genesis} alt="Paceiro Genesis" />
        </div>
      </footer>
    </div>
  );
}
