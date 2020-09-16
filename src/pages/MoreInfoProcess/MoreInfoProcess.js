import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';

import EditIcon from '@material-ui/icons/Edit';
import { Close } from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { AiFillFilePdf, AiFillFileImage } from 'react-icons/ai';
import moment from 'moment';
import 'moment/locale/pt-br';

import { setListProcess } from '../../store/actions/ProcessAction';
import Navbar from '../../components/Navbar/Navbar';
import Backbutton from '../../components/BackButton/Backbutton';
import ModalLoader from '../../components/ModalLoader/ModalLoader';
import Dropdown from '../../components/Dropdown/index';

import apiProcess from '../../services/process.service';

import './MoreInfoProcess.scss';
import '../../global.scss';

function MoreInfoProcess({ listProcess }) {
  const { number } = useParams();
  const [loading, setLoading] = useState(true);
  const User = JSON.parse(localStorage.getItem('get_user'));
  const alert = useAlert();
  const history = useHistory();
  const [processCurrent, setProcessCurrent] = useState(
    listProcess.find((process) => process.id === number),
  );
  const [reloadLog, setReloadLog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiProcess.show({ id: number });
        setProcessCurrent(data);
        setLoading(false);
      } catch (error) {
        alert.error('Erro na listagem de processos');
      }
    };
    fetchData();
  }, [alert, setProcessCurrent, number, reloadLog]);

  function handleTypeIcon(typeDoc) {
    if (typeDoc === 'pdf') {
      return <AiFillFilePdf size={25} color="#ff0000" />;
    }
    if (typeDoc === 'jpg' || typeDoc === 'png' || typeDoc === 'jpeg') {
      return <AiFillFileImage size={25} color="#0000ff" />;
    }
    return <AttachFileIcon />;
  }

  async function handleDeleteProgress(progressId) {
    try {
      await apiProcess.deleteProgress({ id: progressId });
      setReloadLog(!reloadLog);
      alert.success('Andamento deletado com sucesso');
    } catch (error) {
      alert.error('Erro ao deletar o log');
    }
  }

  function handleEditAndamento(progressId) {
    history.push(`/adicionar-informacoes/${processCurrent.id}/${progressId}`);
  }
  /* eslint-disable */
  return (
    <div className="my-log-container">
      <ModalLoader loading={loading} />
      <header>
        <Navbar />
      </header>
      <main>
        <div className="title">
          <div className="txt">
            <Backbutton Redirect="/painel" />
            <h2>{processCurrent && processCurrent.code}</h2>
          </div>
          <Dropdown type={false} id={number} />
        </div>
        <div className="log">
          <div className="related-people">
            <div className="notifying">
              <strong>Notificante:</strong>
              <p>{processCurrent && processCurrent.sender && processCurrent.sender.name}</p>
            </div>
            <div className="notified">
              <strong>Notificado:</strong>
              <p>{processCurrent && processCurrent.receiver && processCurrent.receiver.name}</p>
            </div>
          </div>
          <div className="description">
            <div className="area-law">
              <strong>Área do Direito:</strong>
              <p>{processCurrent && processCurrent.type && processCurrent.type.description}</p>
            </div>
            <div className="subject-process">
              <strong>Assunto da Demanda:</strong>
              <p>{processCurrent && processCurrent.subject}</p>
            </div>
            <div className="register-process">
              <strong>Cadastro:</strong>
              <p>
                {processCurrent && moment(processCurrent.created_at).lang('pt-br').format('LL')}
              </p>
            </div>
          </div>

          <div className="description-demand">
            <strong>Descrição da Demanda</strong>
            <p>{processCurrent && processCurrent.description}</p>
          </div>

          <div className="files-demand">
            <strong>Arquivos da Demanda</strong>
            <ul>
              {processCurrent &&
                processCurrent.receipt.map((files) => (
                  <li>
                    {handleTypeIcon(files.name_origin.split('.')[1])}
                    <a href={files.url} target="_blank">
                      {files.name_origin}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div className="logs">
            <div className="title-process">
              <h1>Historico de andamentos</h1>
            </div>
            <div className="content">
              {processCurrent &&
                processCurrent.log &&
                processCurrent.log.map((progress) => (
                  <ul key={progress.id}>
                    <li>
                      <div className="andamento">
                        <div className="title-log">
                          <div className="info-main-title">
                            <h5>{`Andamento ${progress.order_number}`}</h5>
                            <h6>{moment(progress.created_at).format('LL')}</h6>
                            <div className="log-people">
                              <strong>Mediador:</strong>
                              <h5>{progress.user.name}</h5>
                            </div>
                          </div>
                          {User.type_user === 'ADMINISTRATOR' && (
                            <div className="button-edit-delete">
                              <button
                                type="button"
                                onClick={() => handleDeleteProgress(progress.id)}
                                className="delete-log"
                              >
                                <Close style={{ color: '#FF0000' }} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleEditAndamento(progress.id)}
                                className="delete-log"
                              >
                                <EditIcon style={{ color: '#0000ff', marginLeft: '4px' }} />
                              </button>
                            </div>
                          )}
                        </div>
                        <p>{progress.description}</p>
                        {progress.receipt &&
                          progress.receipt.map((document) => (
                            <div className="files">
                              {handleTypeIcon(document.name_origin.split('.')[1])}
                              <a href={document.url} target="_blank">
                                <p>{document.name_origin}</p>
                              </a>
                            </div>
                          ))}
                      </div>
                    </li>
                  </ul>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
/* eslint-enable */
function mapStateToProps(state) {
  return {
    listProcess: state.process.listProcess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setProcesses(newState) {
      const action = setListProcess(newState);
      dispatch(action);
    },
  };
}

MoreInfoProcess.propTypes = {
  setProcesses: PropTypes.func.isRequired, //eslint-disable-line
  listProcess: PropTypes.array.isRequired, //eslint-disable-line
};
export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoProcess);
