import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import { connect } from 'react-redux';
import { Close } from '@material-ui/icons';
import '../../global.scss';
import './ModalPlans.scss';

import PropTypes from 'prop-types';
import PlanMediator from './PlanMediator';
import PlanInstitution from './PlanInstitution';

import { setVisibleModal, setChangePlan } from '../../store/actions/modalAction';

function ModalPlans(props) {
  const { changePlan, setPlan, setVisible, visible } = props;
  const styleButtonFocus = { background: '#fff200', fontWeight: 700 };
  const [buttonFocusMediator, setButtonFocusMediator] = useState(styleButtonFocus);
  const [buttonFocusPartner, setButtonFocusPartner] = useState({});

  function openModal() {
    setVisible(true);
  }
  function closeModal() {
    setVisible(false);
  }

  function handleClickChangePlanMediador() {
    setButtonFocusMediator(styleButtonFocus);
    setButtonFocusPartner({});
    setPlan(true);
  }
  function handleClickChangePlanPartner() {
    setButtonFocusMediator({});
    setButtonFocusPartner(styleButtonFocus);
    setPlan(false);
  }
  return (
    <div className="modal-plans-container">
      <button type="button" onClick={openModal} className="button-nav">
        Planos
      </button>
      <Modal
        visible={visible}
        width="70%"
        height="600px"
        effect="fadeInDown"
        onClickAway={closeModal}
      >
        <div className="screenModal">
          <div className="plans-title">
            <h1>Planos</h1>
            <button type="button" onClick={closeModal}>
              <Close />
            </button>
          </div>
          <div className="plans-body">
            <div className="header-button">
              <div className="buttons">
                <button
                  type="button"
                  onClick={handleClickChangePlanMediador}
                  style={buttonFocusMediator}
                >
                  Plano Mediador
                </button>
                <button
                  type="button"
                  onClick={handleClickChangePlanPartner}
                  style={buttonFocusPartner}
                >
                  Plano Instituição Parceira
                </button>
              </div>
            </div>
            {changePlan ? <PlanMediator /> : <PlanInstitution />}
          </div>
        </div>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    changePlan: state.modal.changePlan,
    visible: state.modal.visible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setVisible(newState) {
      const action = setVisibleModal(newState);
      dispatch(action);
    },
    setPlan(newState) {
      const action = setChangePlan(newState);
      dispatch(action);
    },
  };
}

ModalPlans.propTypes = {
  changePlan: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  setPlan: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPlans);
