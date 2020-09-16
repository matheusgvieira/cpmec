import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';

import axios from 'axios';
import _ from 'lodash';
import Input from '../../components/Input/Input';
import AUTH from '../../services/auth.service';

import Navbar from '../../components/Navbar/Navbar';
import { dataCity, dataDocuments, customStyles } from './contentSelect';
import Backbutton from '../../components/BackButton/Backbutton';

import './Register.scss';
import '../../global.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [facebook, setFacebook] = useState({});
  const [google, setGoogle] = useState({});
  const [inputMask, setInputMask] = useState('999.999.999-99');
  const [inputPlaceholder, setInputPlaceholder] = useState('000.000.000-61');
  const [selectedValue, setSelectedValue] = useState(1);
  const [selectedValueCity, setSelectedValueCity] = useState(1);
  const [tokenCreate, setTokenCreate] = useState('');
  const [selectedValueUfDocuments, setSelectedValueUfDocuments] = useState(1);
  const [address, setAddress] = useState({});
  const [addressBool, setAddressBool] = useState(false);
  const [documentsContainer, setDocumentsContainer] = useState('container-form-field');

  const { userId, token } = useParams();
  const { handleSubmit, register, errors } = useForm();
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await AUTH.checkToken(token);
        return response;
      } catch (err) {
        alert.error('Token inválido!!');
        return history.goBack();
      }
    }
    if (userId === 'mediador') {
      if (token) {
        const resp = fetchData();
        setTokenCreate(resp.token);
      } else {
        history.goBack();
      }
    } else {
      const facebookData = localStorage.getItem('facebook_data')
        ? JSON.parse(localStorage.getItem('facebook_data'))
        : null;
      const googleData = localStorage.getItem('google_data')
        ? JSON.parse(localStorage.getItem('google_data'))
        : null;

      if (!_.isEmpty(facebookData)) {
        setFacebook(facebookData);
        setEmail(facebookData.email);
      }

      if (!_.isEmpty(googleData)) {
        setGoogle(googleData);
        setEmail(googleData.email);
      }
    }
  }, [alert, email, history, token, userId]);

  async function handleCep(cep) {
    const valueCep = cep.replace('-', '');
    if (valueCep.length === 8) {
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (data.erro === true) alert.error('CEP inválido');
        setAddress(data);
        if (address) setAddressBool(true);
        return true;
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          showCloseButton: true,
          showConfirmButton: false,
          text: 'CEP não encontrado!',
        });
        return false;
      }
    } else {
      return false;
    }
  }

  async function onSubmit({
    /* eslint-disable */
    first_name,
    last_name,
    number_document,
    zipcode,
    number,
    complement,
    neighborhood,
    email,
    cellphone,
    city,
    password,
  }) {
    try {
      const ufTypeDocument = dataCity.find((element) => element.value === selectedValueUfDocuments);
      const numberDocument = number_document.replace(/[^A-Z0-9]/gi, '');
      const numberDoc = ufTypeDocument.label + numberDocument;
      const typeDoc = dataDocuments.find((element) => element.value === selectedValue);
      const united = addressBool
        ? dataCity.find((obj) => obj.label === address.uf)
        : dataCity.find((obj) => obj.value === selectedValueCity);
      const phone = cellphone.replace('-', '').replace('(', '').replace(')', '');

      const body = {
        first_name,
        last_name,
        phone,
        email,
        password,
        type_document: typeDoc.label,
        number_document: documentsContainer !== 'container-form-field' ? numberDoc : numberDocument,
        address: {
          description: address.logradouro,
          zipcode: zipcode.replace('-', ''),
          number,
          complement,
          neighborhood,
          city,
          uf: united.label,
          country: 'BRA',
        },
        avatar: null,
      };

      if (!_.isEmpty(google)) {
        body.google_id = google.googleId;
        if (!_.isEmpty(google.imageUrl)) {
          body.avatar = google.imageUrl;
        }
      }

      if (!_.isEmpty(facebook)) {
        body.facebook_id = facebook.userId;
        if (!_.isEmpty(facebook.avatar)) {
          body.avatar = facebook.picture.data.url;
        }
      }

      switch (userId) {
        case 'admin':
          await AUTH.createMediator({ ...body, token: tokenCreate });
          break;

        case 'administrator':
          await AUTH.createAdministrator({ ...body, token: tokenCreate });
          break;

        default:
          await AUTH.createUser(body);
          break;
      }
      /* eslint-enable */
      alert.success('Usuário cadastrado com sucesso.');
      return history.push('/');
    } catch (err) {
      const {
        response: { data: error },
      } = err;

      if (error && !_.isEmpty(error)) {
        if (_.isArray(error)) {
          const [firstMessage] = error;
          return alert.error(firstMessage.message);
        }

        if (_.isObject(error)) {
          return alert.error(error.message);
        }
      }

      return alert.error('Erro no cadastro do usuário');
    }
  }

  const handleDropdownChangeDocuments = (e) => {
    setSelectedValue(e.value);
    switch (e.value) {
      case 1:
        setInputMask('999.999.999-99');
        setInputPlaceholder('000.000.000-61');
        setDocumentsContainer('container-form-field');
        break;

      case 2:
        setInputMask('99.999.999/9999-99');
        setInputPlaceholder('00.000.000/0000-61');
        setDocumentsContainer('container-form-field');
        break;

      case 3:
        setInputMask('');
        setInputPlaceholder('Inscrição Nº');
        setDocumentsContainer('container-form-field-documents');
        break;

      default:
        break;
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="main">
        <div className="register">
          <div className="insert-data">
            <Backbutton Redirect={`/login/${userId}`} />
            <h2>Preencha os dados abaixo</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="section-data-person">
              <h1 className="h1-title">Dados pessoais</h1>
              <main className="main-form">
                <div className="container-form-field">
                  <Input
                    name="first_name"
                    label="Nome"
                    inputRef={register({
                      required: 'Preencha o campo com o nome do usuário',
                    })}
                  />
                  {errors.first_name && <p className="error">{errors.first_name.message}</p>}
                </div>
                <div className="container-form-field">
                  <Input
                    name="last_name"
                    label="Sobrenome"
                    inputRef={register({
                      required: 'Preencha o campo com o sobrenome do usuário',
                    })}
                  />
                  {errors.last_name && <p className="error">{errors.last_name.message}</p>}
                </div>
                <div className="container-form-field">
                  <p>Tipo de Documento</p>
                  <Select
                    className="select-register"
                    value={dataDocuments.find((obj) => obj.value === selectedValue)}
                    options={dataDocuments}
                    onChange={handleDropdownChangeDocuments}
                    styles={customStyles}
                    name="typeDocument"
                  />
                </div>

                <div className={documentsContainer}>
                  <Input
                    type="text"
                    mask={inputMask}
                    name="number_document"
                    placeholder={inputPlaceholder}
                    inputRef={register({
                      required: 'Preencha o campo com o número do documento',
                    })}
                    label="Número do Documento"
                    maxLength={documentsContainer !== 'container-form-field' ? 6 : null}
                  />
                  {errors.numberDocument && (
                    <p className="error">{errors.numberDocument.message}</p>
                  )}

                  {inputPlaceholder === 'Inscrição Nº' && (
                    <Select
                      className="select-register"
                      value={dataCity.find((obj) => obj.value === selectedValueUfDocuments)}
                      options={dataCity}
                      onChange={(e) => setSelectedValueUfDocuments(e.value)}
                      styles={customStyles}
                      name="ufTypeDocument"
                      inputRef={register}
                    />
                  )}
                </div>
              </main>
            </section>

            <section className="section-localization">
              <h1 className="h1-title">Localização</h1>
              <main className="main-form-cep-city">
                <div className="container-form-field">
                  <Input
                    label="CEP"
                    name="zipcode"
                    maxLength="8"
                    inputRef={register({
                      required: 'Preencha o campo com o CEP',
                    })}
                    placeholder="72000000"
                    onChange={(e) => handleCep(e.target.value)}
                  />
                  {errors.zipcode && <p className="error">{errors.zipcode.message}</p>}
                </div>
                <div className="container-form-field">
                  <Input
                    label="Cidade"
                    name="city"
                    inputRef={register({
                      required: 'Preencha o campo com a cidade',
                    })}
                    value={address.localidade}
                  />
                  {errors.city && <p className="error">{errors.city.message}</p>}
                </div>
                <div className="container-form-field">
                  <Input
                    label="Número"
                    name="number"
                    inputRef={register({
                      required: 'Preencha o campo com o número da lote ou apartamento',
                    })}
                  />
                  {errors.number && <p className="error">{errors.number.message}</p>}
                </div>
                <div className="container-form-field">
                  <Input label="Complemento(opcional)" name="complement" inputRef={register} />
                </div>
                <div className="container-form-field">
                  <Input
                    label="Bairro"
                    name="neighborhood"
                    inputRef={register({
                      required: 'Preencha o campo com o bairro',
                    })}
                    value={address.bairro}
                  />
                  {errors.neighborhood && <p className="error">{errors.neighborhood.message}</p>}
                </div>

                <div className="container-form-field">
                  <p>Estado</p>
                  <Select
                    className="select-register"
                    value={
                      addressBool
                        ? dataCity.find((obj) => obj.label === address.uf)
                        : dataCity.find((obj) => obj.value === selectedValueCity)
                    }
                    options={dataCity}
                    onChange={(e) => setSelectedValueCity(e.value)}
                    styles={customStyles}
                    inputRef={register}
                    name="uf"
                  />
                </div>
              </main>
            </section>

            <section className="section-data-register">
              <h1 className="h1-title">Dados cadastrais</h1>
              <main className="main-form">
                <div className="container-form-field">
                  <Input
                    type="email"
                    name="email"
                    defaultValue={email}
                    label="E-mail"
                    inputRef={register({
                      required: 'Preencha o campo com o email',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Digite um endereço de e-mail válido',
                      },
                    })}
                  />
                  {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                <div className="container-form-field">
                  <Input
                    type="text"
                    mask="(99)99999-9999"
                    label="Celular"
                    name="cellphone"
                    placeholder="(00)99000-0000"
                    inputRef={register({
                      required: 'Preencha o campo com o número de celular',
                    })}
                  />
                  {errors.cellphone && <p className="error">{errors.cellphone.message}</p>}
                </div>
                <div className="container-form-field">
                  <Input
                    type="password"
                    name="password"
                    label="Senha"
                    inputRef={register({
                      required: 'Preencha o campo com a senha',
                    })}
                    placeholder="A senha deve conter letras miniúsculas, maiúsculas e números. Exemplo: Abc123"
                  />
                  {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
              </main>
            </section>
            <section className="section-button">
              <button className="btn-submit" type="submit" id={userId}>
                ENVIAR
              </button>
              <span>Confirme o cadastro no seu email</span>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
