import React from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { setTextSign } from '../../store/actions/modalAction';

import PropTypes from 'prop-types'; //eslint-disable-line

import Navbar from '../../components/Navbar/Navbar';
import Handshake from '../../assets/handshake.png';

import Law from '../../assets/law.png';
import { PlanBenefits } from './benefits';
import Coins from '../../assets/coins.png';

import './Plans.scss';
import '../../global.scss';

function Plans(props) {
  const { setTxtSign } = props;
  const history = useHistory();

  function handleClickMediator() {
    setTxtSign(['Assinar Plano', 'Eu quero assinar o Plano Mediador do CPMEC!']);
    history.push('/contato');
  }

  function handleClickPatner() {
    setTxtSign(['Assinar Plano', 'Eu quero assinar o Plano Instituição Parceira do CPMEC!']);
    history.push('/contato');
  }

  return (
    <div className="plans-container">
      <header>
        <Navbar />
      </header>

      <main>
        <div className="title-mediator">
          <img src={Law} alt="LawIcon" />
          <h1>Plano Mediador</h1>
        </div>
        <div className="text-plan-mediator">
          <p>
            Neste servico está inclusa a taxa para utilização da plataforma digital, por parte do
            Mediador Extrajudicial, que receberá o encaminhamento de demandas a serem mediados
            diretamente em seu cadastro de usuário.
          </p>
        </div>
        <div className="value-plan-mediator">
          <img src={Coins} alt="CoinsIcon" />
          <p>R$ 250/mês</p>
        </div>
        <div className="benefits-mediator">
          <ul>
            {PlanBenefits.plan1.map((benefits) => (
              <li>{benefits}</li>
            ))}
          </ul>
        </div>
        <div className="button-mediator">
          <button type="button" className="button-sign" onClick={handleClickMediator}>
            Assinar
          </button>
        </div>
        <div className="title-partner">
          <img src={Handshake} alt="HandshakeIcon" />
          <h1>Plano Instituição Parceira</h1>
        </div>
        <div className="text-plan-partner">
          <p>
            Neste servico estará inclusa a remuneração do Mediador Extrajudicial, que receberá o
            encaminhamento de demandas a serem mediados diretamente em seu cadastro de usuário.
          </p>
        </div>
        <div className="value-plan-partner">
          <img src={Coins} alt="CoinsIcon" />
          <p>Depende da Demanda</p>
        </div>
        <div className="benefits-partner">
          <ul>
            {PlanBenefits.plan2.map((benefits) => (
              <li>{benefits}</li>
            ))}
          </ul>
        </div>
        <div className="button-partner">
          <button type="button" className="button-sign" onClick={handleClickPatner}>
            Assinar
          </button>
        </div>
        <div className="bar-between" />
      </main>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    dataTextSign: state.modal.dataTextSign,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTxtSign(newState) {
      const action = setTextSign(newState);
      dispatch(action);
    },
  };
}

Plans.propTypes = {
  setTxtSign: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
