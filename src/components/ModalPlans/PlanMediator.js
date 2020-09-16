import React from 'react';

import { connect } from 'react-redux';
import {
  setVisibleModal,
  setTextSign,
  setVisibleModalContato,
} from '../../store/actions/modalAction';

import { PlanBenefits } from './benefits';
import Law from '../../assets/icon/law.svg';
import Coins from '../../assets/icon/coins.svg';
import './ModalPlans.scss';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'; //eslint-disable-line
import PropTypes from 'prop-types'; //eslint-disable-line

function PlanMediator(props) {
  // eslint-disable-next-line no-unused-vars
  const { setVisible, setVisibleContato, setTxtSign, dataTextSign } = props;

  function handleClickSign() {
    setTxtSign(['Assinar Plano', 'Eu quero assinar o Plano Mediador do CPMEC!']);
    setVisible(false);
    setVisibleContato(true);
  }

  /* eslint-disable */

  return (
    <main className="main-mediator">
      <div className="title-mediator">
        <img src={Law} alt="LawIcon" />
        <h1>Plano Mediador</h1>
      </div>
      <div className="text-plan-mediator">
        <p>
          Neste servico estará inclusa a remuneração do Mediador Extrajudicial, o qual poderá
          Cadastrar, Movimentar, Finalizar e Monitorar demandas extrajudiciais em sua
          responsabilidade.
        </p>
      </div>
      <div className="value-plan-mediator">
        <div className="coins">
          <img src={Coins} alt="CoinsIcon" />
          <p>R$ 250/mês</p>
        </div>
        <button type="button" className="button-sign" onClick={handleClickSign}>
          Assinar
        </button>
      </div>
      <div className="benefits-mediator">
        <ul>
          {PlanBenefits.plan1.map((benefits, i) => (
            <li key={i}>{benefits}</li> //eslint-disable-line
          ))}
        </ul>
      </div>
    </main>
  );
}

/* eslint-enable */

function mapStateToProps(state) {
  return {
    changePlan: state.modal.changePlan,
    dataTextSign: state.modal.dataTextSign,
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

PlanMediator.propTypes = {
  setVisible: PropTypes.func.isRequired,
  setVisibleContato: PropTypes.func.isRequired,
  setTxtSign: PropTypes.func.isRequired,
  dataTextSign: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.string]))
    .isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanMediator);
