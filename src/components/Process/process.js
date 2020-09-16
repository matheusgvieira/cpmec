import React from 'react';
import { useHistory } from 'react-router-dom';

import InfoIcon from '@material-ui/icons/Info';

import PropTypes from 'prop-types';

import './process.scss';

function Process({ demand }) {
  const { code, status, type, subject, receiver, sender, id } = demand;

  const history = useHistory();

  return (
    <div className="process-content">
      <div className="related-people">
        <div className="notifying">
          <strong>Notificante:</strong>
          <p>{sender && sender.name}</p>
        </div>
        <div className="notified">
          <strong>Notificado:</strong>
          <p>{receiver && receiver.name}</p>
        </div>
      </div>
      <div className="number-process">
        <strong>{code && code}</strong>
        <div className="information-process">
          <div className="status">{status && status.description.toUpperCase()}</div>
          <button type="button" onClick={() => history.push(`/mais-informacoes-processo/${id}`)}>
            <InfoIcon />
          </button>
        </div>
      </div>
      <div className="description">
        <div className="area-law">
          <strong>Área do Direito:</strong>
          <p>{type && type.description}</p>
        </div>
        <div className="subject-process">
          <strong>Assunto da Demanda:</strong>
          <p>{subject && subject}</p>
        </div>
        <div className="register-process">
          <strong>Cadastro:</strong>
          <p>17/05/2020</p>
        </div>
      </div>
    </div>
  );
}

Process.propTypes = {
  demand: PropTypes.shape({
    code: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    status: PropTypes.shape({ description: PropTypes.string.isRequired }),
    type: PropTypes.shape({ description: PropTypes.string.isRequired }),
    sender: PropTypes.shape({ name: PropTypes.string.isRequired }),
    receiver: PropTypes.shape({ name: PropTypes.string.isRequired }),
  }).isRequired,
};

export default Process;
