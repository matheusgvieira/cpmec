import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import Backbutton from '../../components/BackButton/Backbutton';

import './MyAccount.scss';
import '../../global.scss';

export default function MyAccount() {
  return (
    <div className="my-account-container">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="title">
          <Backbutton Redirect="/painel" />
          <h2>Minha conta</h2>
        </div>
        <div className="account">
          <div className="delete">
            <h3>Deletar Conta</h3>
            <p>Depois de excluir sua conta, não há como voltar atrás. Tenha certeza.</p>
            <button type="button">Deletar sua conta</button>
          </div>
        </div>
      </main>
    </div>
  );
}
