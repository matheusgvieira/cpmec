import React from 'react';

import { connect } from 'react-redux';
import {
  setVisibleModal,
  setVisibleModalContato,
  setTextSign,
} from '../../store/actions/modalAction';

import { PlanBenefits } from './benefits';
import Handshake from '../../assets/handshake.png';
import Coins from '../../assets/icon/coins.svg';
import './ModalPlans.scss';
import PropTypes from 'prop-types'; //eslint-disable-line

function PlanInstitution(props) {
  const { setVisible, setTxtSign, setVisibleContato } = props;

  function handleClickSign() {
    setTxtSign(['Assinar Plano', 'Eu quero assinar o Plano Instituição Parceira do CPMEC!']);
    setVisible(false);
    setVisibleContato(true);
  }

  return (
    <main className="main-partner">
      <div className="title-partner">
        <img src={Handshake} alt="HandshakeIcon" />
        <h1>Plano Instituição Parceira</h1>
      </div>
      <div className="text-plan-partner">
        <p>
          Neste servico estará inclusa a remuneração mensal do Mediador Extrajudicial, que receberá
          o encaminhamento de demandas a serem mediadas diretamente em seu cadastro.
        </p>
      </div>
      <div className="value-plan-partner">
        <div className="coins">
          <img src={Coins} alt="CoinsIcon" />
          <p>Depende da Demanda</p>
        </div>
        <button type="button" className="button-sign" onClick={handleClickSign}>
          Assinar
        </button>
      </div>
      <div className="benefits-partner">
        <ul>
          {PlanBenefits.plan2.map((benefits, i) => (
            <li key={i}>{benefits}</li> //eslint-disable-line
          ))}
        </ul>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    changePlan: state.modal.changePlan,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setVisible(newState) {
      const action = setVisibleModal(newState);
      dispatch(action);
    },

    setVisibleContato(newState) {
      const action = setVisibleModalContato(newState);
      dispatch(action);
    },

    setTxtSign(newState) {
      const action = setTextSign(newState);
      dispatch(action);
    },
  };
}

PlanInstitution.propTypes = {
  setVisible: PropTypes.func.isRequired,
  setVisibleContato: PropTypes.func.isRequired,
  setTxtSign: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanInstitution);
