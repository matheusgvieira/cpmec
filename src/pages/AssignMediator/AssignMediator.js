import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Backbutton from '../../components/BackButton/Backbutton';
import Input from '../../components/Input/Input';

import Process from '../../services/process.service';

import './AssignMediator.scss';

export default function AssignMediator() {
  const { handleSubmit, register, errors } = useForm();
  const [maskPlace, setMaskPlace] = useState({
    mask: '999.999.999-99',
    place: '000.000.000.61',
  });

  const { id } = useParams();

  const alert = useAlert();

  const history = useHistory();

  /* eslint-disable */
  const onSubmit = ({ numberDocument }) => {
    const number_document = numberDocument
      .replace('.', '')
      .replace('.', '')
      .replace('-', '')
      .replace('/', '');
    try {
      Process.assignMediator({ number_document: number_document, id });
      alert.success('Dados enviados para email do mediador');
      history.push(`/mais-informacoes-processo/${id}`);
    } catch (error) {
      alert.error('Mediador não cadastrado');
    }
  };

  function handleCPF() {
    setMaskPlace({
      mask: '999.999.999-99',
      place: '000.000.000-61',
    });
  }
  function handleCNPJ() {
    setMaskPlace({
      mask: '99.999.999/9999-99',
      place: '00.000.000/0000-61',
    });
  }
  function handleOAB() {
    setMaskPlace({
      mask: null,
      place: 'Inscrição Nº - Exemplo: DF005490',
    });
  }
  /* eslint-enable */
  return (
    <div className="forgot-password-container">
      <header>
        <Navbar />
      </header>

      <main>
        <div className="title">
          <Backbutton Redirect="/" />
          <h2>Insira o documento do mediador</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="types-document">
            <label htmlFor="document" className="label-type-document">
              <input type="radio" id="document" name="gender" onChange={handleCPF} defaultChecked />
              <p>CPF</p>
            </label>
            <label htmlFor="undocument" className="label-type-document">
              <input type="radio" id="undocument" name="gender" onChange={handleCNPJ} />
              <p>CNPJ</p>
            </label>
            <label htmlFor="undocument" className="label-type-document">
              <input type="radio" id="unknow" name="gender" onChange={handleOAB} />
              <p>OAB</p>
            </label>
          </div>
          <Input
            type="text"
            label="CPF"
            name="numberDocument"
            inputRef={register({
              required: 'Preencha o campo com CPF cadastrado',
            })}
            mask={maskPlace.mask}
            placeholder={maskPlace.place}
          />
          {errors.numberDocument && <p className="error">{errors.numberDocument.message}</p>}
          <button type="submit">Enviar</button>
        </form>
      </main>
    </div>
  );
}
