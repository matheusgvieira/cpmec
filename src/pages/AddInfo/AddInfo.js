import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddIcon from '@material-ui/icons/Add';
import { setAllArrayFiles } from '../../store/actions/fileAction';
import Input from '../../components/Input/Input';
import Navbar from '../../components/Navbar/Navbar';
import FileInput from '../../components/FileInput/FileInput';
import BackButton from '../../components/BackButton/Backbutton';
import { dataType, customStyles, dataStatusType } from './contentSelect';

import ModalLoader from '../../components/ModalLoader/ModalLoader';
import apiProcess from '../../services/process.service';

import './AddInfo.scss';
import '../../global.scss';

function AddInfo({ files, listProcess, setAllFiles }) {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedStatusType, setSelectedStatusType] = useState(0);
  const [typeDemandError, setTypeDemandError] = useState(false);
  const [typeDemandErrorStatus, setTypeDemandErrorStatus] = useState(false);
  const [arrayFiles, setArFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { handleSubmit, register, errors } = useForm();
  const { id, progressId } = useParams();
  const alert = useAlert();
  const history = useHistory();

  const [processCurrent, setProcessCurrent] = useState(
    listProcess.find((process) => process.id === id),
  );

  const [progressCurrent, setProgressCurrent] = useState(
    listProcess.log ? listProcess.log.find((progress) => progress.id === progressId) : null,
  );

  useEffect(() => {
    setAllFiles([]);
    const fetchData = async () => {
      try {
        const { data } = await apiProcess.show({ id });
        setProcessCurrent(data);
        setProgressCurrent(data.log.find((element) => element.id === parseInt(progressId, 10)));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert.error('Erro na listagem de processos');
      }
    };
    fetchData();
  }, [alert, setProcessCurrent, id, setAllFiles, progressId, setProgressCurrent]);

  useEffect(() => {
    setTypeDemandError(false);
    setTypeDemandErrorStatus(false);
  }, [selectedType, selectedStatusType]);

  const onSubmit = async ({ subject, description }) => {
    if (selectedType === 0) {
      setTypeDemandError(true);
      return;
    }
    if (selectedStatusType === 0) {
      setTypeDemandErrorStatus(true);
      return;
    }
    const data = new FormData();
    data.append('description', description);
    data.append('subject', subject);
    files.map((value) => data.append('receipt[]', value));
    data.append('log_status_id', selectedType);
    data.append('process_id', processCurrent.id);
    data.append('process_status_id', selectedStatusType);
    console.log(data);

    try {
      if (progressId) {
        await apiProcess.updateProgress({ id: progressId, data });
        alert.success('Andamento atualizado com sucesso');
      } else {
        await apiProcess.log({ data });
        alert.success('Demanda atualizada com sucesso');
      }
      history.push(`/mais-informacoes-processo/${id}`);
    } catch (error) {
      alert.error('Erro ao atualizar demanda');
    }
  };

  function handleSelectedType() {
    if (progressCurrent) {
      if (progressCurrent.status) {
        return progressCurrent.status.id;
      }
    }
    return selectedType;
  }

  return (
    <div className="add-info-container">
      <ModalLoader loading={loading} />
      <header>
        <Navbar />
      </header>
      <main>
        <div className="title">
          <BackButton Redirect="/painel" />
          <h2>{progressId ? 'Editar Andamento' : 'Atualizar Demanda'}</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="data-update">
            <Input
              type="text"
              name="subject"
              placeholder="Título da Atualização"
              inputRef={register({
                required: 'Preencha o campo com o título da atualização',
              })}
              defaultValue={progressCurrent && progressCurrent.subject}
            />
            {errors.subject && <p className="error">{errors.subject.message}</p>}
            <Select
              value={dataType.find((obj) => obj.value === handleSelectedType())}
              options={dataType}
              onChange={(e) => setSelectedType(e.value)}
              styles={customStyles}
              isOptionDisabled={(option) => option.isdisabled}
            />
            {typeDemandError && (
              <p className="error" id="select-error">
                Preencha o campo com o tipo de atualização.
              </p>
            )}
            <Select
              value={dataStatusType.find((obj) => obj.value === selectedStatusType)}
              options={dataStatusType}
              onChange={(e) => setSelectedStatusType(e.value)}
              styles={customStyles}
              isOptionDisabled={(option) => option.isdisabled}
            />
            {typeDemandErrorStatus && (
              <p className="error" id="select-error">
                Preencha o campo com o status da demanda.
              </p>
            )}
            <textarea
              name="description"
              id=""
              cols="30"
              rows="9"
              placeholder="Descrição da atualização da demanda"
              ref={register({
                required: 'Preencha o campo com a descrição da atualização',
              })}
              defaultValue={progressCurrent && progressCurrent.description}
            />
            {errors.description && <p className="error">{errors.description.message}</p>}
          </div>
          <div className="file-input">
            <FileInput nameDocument="Adicione um Arquivo" />
            {arrayFiles.map((name) => (
              <FileInput nameDocument={name} />
            ))}
            <div className="button-add-file">
              <button
                type="button"
                onClick={() => setArFiles([...arrayFiles, 'Adicione outro arquivo'])}
                className="add-input-file"
              >
                <AddIcon />
                Outro documento
              </button>
            </div>
          </div>
          <div className="button-update-process">
            <button type="submit">{progressId ? 'Atualizar Andamento' : 'Atualizar'}</button>
          </div>
        </form>
      </main>
      <footer />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    files: state.file.files,
    listProcess: state.process.listProcess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAllFiles(newState) {
      const action = setAllArrayFiles(newState);
      dispatch(action);
    },
  };
}

AddInfo.propTypes = {
  files: PropTypes.objectOf(PropTypes.any).isRequired,
  listProcess: PropTypes.objectOf(PropTypes.any).isRequired,
  setAllFiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInfo);
