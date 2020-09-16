import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import './RegisterProcess.scss';
import '../../global.scss';

import AttachFileIcon from '@material-ui/icons/AttachFile';
import { AiFillFilePdf, AiFillFileImage } from 'react-icons/ai';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import _ from 'lodash';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { setAllArrayFiles } from '../../store/actions/fileAction';
import Input from '../../components/Input/Input';
import Navbar from '../../components/Navbar/Navbar';
import { dataLaw, customStyles, subDataLaw } from './dataSelect';

import ModalLoader from '../../components/ModalLoader/ModalLoader';
import BackButton from '../../components/BackButton/Backbutton';
import FileInput from '../../components/FileInput/FileInput';
import AddressProcess from '../../components/AddressProcess/AddressProcess';

import Process from '../../services/process.service';

function RegisterProcess({ files, listProcess, inputSendAddress }) {
  const { id } = useParams();
  const alert = useAlert();
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();

  const [selectedValueSubject, setSelectedValueSubject] = useState(0);
  const [selectedValueSubSubject, setSelectedValueSubSubject] = useState(11);
  const [userNotifying, setUserNotifying] = useState(false);
  const [inputRadioNotified, setInputRadioNotified] = useState(false);
  const [inputRadioNotifying, setInputRadioNotifying] = useState(false);
  const [addressNotified, setAddressNotified] = useState({});
  const [addressNotifying, setAddressNotifying] = useState({});
  const [arrayFiles, setArrayFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [oldFiles, setOldFiles] = useState([]);
  const [oldIdFiles, setOldIdFiles] = useState([]);
  const [typeDemandError, setTypeDemandError] = useState(false);
  const [processCurrent, setProcessCurrent] = useState(
    listProcess.find((process) => process.id === id),
  );

  async function handleCep(cep, type) {
    if (cep.length === 8) {
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (type === 'notified') setAddressNotified(data);
        if (type === 'notifying') setAddressNotifying(data);
        if (data.erro === true) alert.error('CEP não foi encontrado!');
        return;
      } catch (err) {
        alert.error('CEP não foi encontrado!');
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Process.show({ id });
        setProcessCurrent(data);
        setOldFiles(data.receipt);
        setLoading(false);
      } catch (error) {
        alert.error('Erro na listagem de demandas');
      }
    };
    fetchData();
  }, [alert, setProcessCurrent, id, setOldFiles]);

  function handleSelectValue() {
    if (processCurrent && processCurrent.type) {
      return processCurrent.type.id;
    }
    return selectedValueSubject;
  }

  function handleSubSubject() {
    if (processCurrent && processCurrent.subject) {
      return processCurrent.subject;
    }
    return selectedValueSubSubject;
  }

  function styleAddressNotifiedNotifying() {
    if (processCurrent) {
      return 'address-notification';
    }
    if (inputRadioNotified && inputRadioNotifying) {
      return 'address-notification';
    }
    if (inputRadioNotified) {
      return 'address-notified';
    }
    if (inputRadioNotifying) {
      return 'address-notifying';
    }
    return null;
  }

  function handleTypeIcon(typeDoc) {
    if (typeDoc === 'pdf') {
      return <AiFillFilePdf size={25} color="#ff0000" />;
    }
    if (typeDoc === 'jpg' || typeDoc === 'png' || typeDoc === 'jpeg') {
      return <AiFillFileImage size={25} color="#0000ff" />;
    }
    return <AttachFileIcon />;
  }

  const removeEmpty = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
      else if (obj[key] === undefined || obj[key] === null || obj[key] === '') delete obj[key];
    });
    return obj;
  };

  const onSubmit = async ({
    notifying,
    notified,
    description,
    notified_number,
    notifying_number,
    notified_phone,
    notifying_phone,
    notified_complement,
    notifying_complement,
  }) => {
    const subject = subDataLaw.find((element) => element.value === selectedValueSubSubject).label;
    if (selectedValueSubject === 0) {
      setTypeDemandError(true);
      return;
    }
    setTypeDemandError(false);
    if (!id) {
      if (files.length < 3 && inputSendAddress) {
        alert.error(
          'É necessário fazer o upload dos 3 documentos iniciais: Identidade com foto, Comprovante de endereço e Comprovante de direito alegado',
        );
        return;
      }

      if (files.length < 2 && !inputSendAddress) {
        alert.error(
          'É necessário fazer o upload dos 3 documentos iniciais: Identidade com foto e Comprovante de direito alegado',
        );
        return;
      }
    }

    try {
      if (id) {
        await Process.update(
          removeEmpty({
            subject,
            notifying,
            notified,
            description,
            notified_number,
            selectedValueSubject,
            selectedValueSubSubject,
            notifying_number,
            notified_phone,
            notifying_phone,
            userNotifying: !userNotifying,
            // eslint-disable-next-line camelcase
            phone_notifying: notifying_phone && notifying_phone.replace(/[^A-Z0-9]/gi, ''),
            addressNotifying,
            notified_complement,
            // eslint-disable-next-line camelcase
            phone_notified: notified_phone && notified_phone.replace(/[^A-Z0-9]/gi, ''),
            addressNotified,
            files,
            notifying_complement,
            oldIdFiles,
          }),
          id,
        );
      } else {
        await Process.create(
          removeEmpty({
            subject,
            notifying,
            notified,
            description,
            notified_number,
            selectedValueSubject,
            notifying_number,
            notified_phone,
            notifying_phone,
            userNotifying: !userNotifying,
            // eslint-disable-next-line camelcase
            phone_notifying: notifying_phone && notifying_phone.replace(/[^A-Z0-9]/gi, ''),
            addressNotifying,
            notified_complement,
            // eslint-disable-next-line camelcase
            phone_notified: notified_phone && notified_phone.replace(/[^A-Z0-9]/gi, ''),
            addressNotified,
            files,
            notifying_complement,
          }),
        );
      }
      if (id) {
        alert.success('Demanda atualizada com sucesso');
      } else {
        alert.success('Demanda cadastrada com sucesso');
      }
      history.push(`/mais-informacoes-processo/${id}`);
    } catch (err) {
      const {
        response: { data: error },
      } = err;

      if (error && !_.isEmpty(error)) {
        if (_.isArray(error)) {
          const [firstMessage] = error;
          alert.error(firstMessage.message);
        }

        if (_.isObject(error)) {
          alert.error(error.message);
        }
      }
      alert.error('Erro no cadastro da demanda');
    }
  };
  return (
    <div className="register-process-container">
      <ModalLoader loading={loading} />
      <header>
        <Navbar />
      </header>
      <main>
        <div className="title">
          <BackButton Redirect="/painel" />
          <h2>{id ? 'Editar Demanda' : 'Cadastro de Demanda'}</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="notification">
            <div className="notified">
              <Input
                type="text"
                placeholder="Notificado"
                name="notified"
                inputRef={register({
                  required: 'Preencha o campo com o notificado',
                })}
                onChange={(e) => setInputRadioNotified(!!e.target.value)}
                defaultValue={processCurrent && processCurrent.receiver.name}
              />
              {errors.notified && <p className="error">{errors.notified.message}</p>}
            </div>
            {(processCurrent ? userNotifying : !userNotifying) && (
              <div className="user-notifying">
                <label htmlFor="notifying" className="user">
                  <input
                    type="radio"
                    id="notifying"
                    name="gender"
                    onChange={() => setUserNotifying(false)}
                  />
                  <p>Sou o notificante</p>
                </label>
                <label htmlFor="not-notifying" className="user">
                  <input
                    type="radio"
                    name="gender"
                    id="not-notifying"
                    onChange={() => setUserNotifying(true)}
                  />
                  <p>Não sou o notificante</p>
                </label>
              </div>
            )}
            {(processCurrent ? !userNotifying : userNotifying) && (
              <div className="notifying">
                <Input
                  type="text"
                  placeholder="Notificante"
                  name="notifying"
                  inputRef={register({
                    required: 'Preencha o campo com o notificante',
                  })}
                  onChange={(e) => setInputRadioNotifying(!!e.target.value)}
                  defaultValue={processCurrent && processCurrent.sender.name}
                />
                {errors.notifying && <p className="error">{errors.notifying.message}</p>}
              </div>
            )}
          </div>
          <div className={styleAddressNotifiedNotifying()}>
            {(processCurrent ? !inputRadioNotified : inputRadioNotified) && (
              <div className="notified">
                <AddressProcess type="notificado" showAddress={!!processCurrent}>
                  <div className="address-notified">
                    <Input
                      placeholder="CEP"
                      maxLength="8"
                      onChange={(e) => handleCep(e.target.value, 'notified')}
                      /* eslint-disable */
                      defaultValue={
                        processCurrent.receiver &&
                        processCurrent.receiver.address &&
                        processCurrent.receiver.address.zipcode
                      }
                      /* eslint-enable */
                    />
                    <Input
                      name="notified_number"
                      placeholder="Número"
                      inputRef={register}
                      /* eslint-disable */
                      defaultValue={
                        processCurrent.receiver &&
                        processCurrent.receiver.address &&
                        processCurrent.receiver.address.number
                      }
                      /* eslint-enable */
                    />
                  </div>
                  <div className="address-notified">
                    <Input
                      name="notified_complement"
                      placeholder="Complemento"
                      inputRef={register}
                      /* eslint-disable */
                      defaultValue={
                        processCurrent.receiver &&
                        processCurrent.receiver.address &&
                        processCurrent.receiver.address.complement
                      }
                      /* eslint-enable */
                    />
                    <Input
                      name="notified_phone"
                      placeholder="Celular"
                      mask="(99)99999-9999"
                      inputRef={register}
                      defaultValue={processCurrent && processCurrent.receiver.phone}
                    />
                  </div>
                </AddressProcess>
              </div>
            )}
            {(processCurrent ? !inputRadioNotifying : inputRadioNotifying) && (
              <div className="notifying">
                <AddressProcess type="notificante" showAddress={!!processCurrent}>
                  <div className="address-notified">
                    <Input
                      placeholder="CEP"
                      maxLength="8"
                      onChange={(e) => handleCep(e.target.value, 'notifying')}
                      /* eslint-disable */
                      defaultValue={
                        processCurrent.sender &&
                        processCurrent.sender.address &&
                        processCurrent.sender.address.zipcode
                      }
                      /* eslint-enable */
                    />
                    <Input
                      name="notifying_number"
                      placeholder="Número"
                      inputRef={register}
                      /* eslint-disable */
                      defaultValue={
                        processCurrent.sender &&
                        processCurrent.sender.address &&
                        processCurrent.sender.address.number
                      }
                      /* eslint-enable */
                    />
                  </div>
                  <div className="address-notified">
                    <Input
                      name="notifying_complement"
                      placeholder="Complemento"
                      inputRef={register}
                      /* eslint-disable */
                      defaultValue={
                        processCurrent.sender &&
                        processCurrent.sender.address &&
                        processCurrent.sender.address.complement
                      }
                      /* eslint-enable */
                    />
                    <Input
                      name="notifying_phone"
                      placeholder="Celular"
                      mask="(99)99999-9999"
                      inputRef={register}
                      defaultValue={processCurrent && processCurrent.sender.phone}
                    />
                  </div>
                </AddressProcess>
              </div>
            )}
          </div>
          <div className="info-main">
            <div className="type-demand">
              <Select
                styles={customStyles}
                value={dataLaw.find((obj) => obj.value === handleSelectValue())}
                options={dataLaw}
                onChange={(e) => setSelectedValueSubject(e.value)}
                isOptionDisabled={(option) => option.isdisabled}
              />
              {typeDemandError && (
                <p className="error" id="select-error">
                  Preencha o campo com a área do Direito
                </p>
              )}
            </div>
            <div className="type-demand">
              <Select
                styles={customStyles}
                value={subDataLaw.find((obj) => obj.value === handleSubSubject())}
                options={subDataLaw}
                onChange={(e) => setSelectedValueSubSubject(e.value)}
                isOptionDisabled={(option) => option.isdisabled}
              />
              {typeDemandError && (
                <p className="error" id="select-error">
                  Preencha o campo com a sub área do direito
                </p>
              )}
            </div>
          </div>
          <div className="description">
            <textarea
              id=""
              cols="30"
              rows="5"
              placeholder="Descreva o conflito que você deseja resolver"
              name="description"
              ref={register({
                required: 'Preencha o campo com a descrição do conflito',
              })}
              defaultValue={processCurrent && processCurrent.description}
            />
            {errors.description && <p className="error">{errors.description.message}</p>}
          </div>
          <div className="old-files">
            <h2>Arquivos anexados na demanda</h2>
            {oldFiles && // eslint-disable-line
              oldFiles.map((
                oldFile, // eslint-disable-line
              ) => (
                <div className="old-files-content">
                  {handleTypeIcon(oldFile.name_origin.split('.')[1])}
                  <p>{oldFile.name_origin}</p>
                  <div className="old-files-buttons">
                    <button
                      type="button"
                      title="Retirar arquivo"
                      onClick={() => setOldIdFiles([...oldIdFiles, oldFile.id])}
                      disabled={oldIdFiles.find((idFiles) => idFiles === oldFile.id) === oldFile.id}
                    >
                      <CheckIcon style={{ color: '#008000' }} />
                    </button>
                    <button
                      type="button"
                      title="Retirar arquivo"
                      onClick={() => setOldFiles(oldFiles.filter((file) => file.id !== oldFile.id))}
                      disabled={oldIdFiles.find((idFiles) => idFiles === oldFile.id) === oldFile.id}
                    >
                      <CloseIcon style={{ color: '#FF0000' }} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="file-input">
            {!oldFiles && <FileInput nameDocument="Documento de Identidade com Foto" />}
            {!oldFiles && <FileInput nameDocument="Comprovantes de Direito Alegado" />}
            {inputSendAddress && inputRadioNotified && (
              <FileInput nameDocument="Comprovante de Endereço" />
            )}
            {arrayFiles.map((name) => (
              <FileInput nameDocument={name} />
            ))}
            <div className="button-add-file">
              <button
                type="button"
                onClick={() => setArrayFiles([...arrayFiles, 'Adicione outro arquivo'])}
                className="add-input-file"
              >
                <AddIcon />
                Outro documento
              </button>
            </div>
          </div>
          <div className="button-create-process">
            <button type="submit">{id ? 'Atualizar' : 'Cadastrar'}</button>
          </div>
        </form>
      </main>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    files: state.file.files,
    listProcess: state.process.listProcess,
    inputSendAddress: state.addressNotified.inputSendAddress,
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

RegisterProcess.propTypes = {
  files: PropTypes.objectOf(PropTypes.any).isRequired,
  listProcess: PropTypes.objectOf(PropTypes.any).isRequired,
  inputSendAddress: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterProcess);
