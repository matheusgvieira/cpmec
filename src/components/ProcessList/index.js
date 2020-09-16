import React from 'react';

import PropTypes from 'prop-types';

import './styles.scss';
import '../../global.scss';

function ProcessList({ process }) {
  return (
    <div className="process-list-container">
      <div className="process">
        <h3>{process.code}</h3>
        <div className="name-search">
          <strong>Notificado:</strong>
          <p>{process.bill}</p>
        </div>
      </div>
      <div className="andamento">
        <strong>Último Andamento:</strong>
        <p>{process.status}</p>
      </div>
    </div>
  );
}

ProcessList.propTypes = {
  process: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ProcessList;
