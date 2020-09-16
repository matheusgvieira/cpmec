import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';

import Input from '../../components/Input/Input';
import AUTH from '../../services/auth.service';

import Navbar from '../../components/Navbar/Navbar';
import { dataTypeUser, customStyles } from './contentSelect';
import Backbutton from '../../components/BackButton/Backbutton';

import './RegisterUser.scss';
import '../../global.scss';

const RegisterUser = () => {
  const [selectedValueUser, setSelectedValueUser] = useState(1);

  const { handleSubmit, register, errors } = useForm();
  const alert = useAlert();
  const history = useHistory();

  async function onSubmit({ email }) {
    try {
      const type = dataTypeUser
        .find((element) => element.value === selectedValueUser)
        .label.toLowerCase();
      await AUTH.insertUser({ email, type });
      alert.success('Email enviado para o usuário cadastrado');
      history.push('/painel');
    } catch (error) {
      alert.error('Erro no cadastro do usuário');
    }
  }

  return (
    <div className="register-user-container">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="title">
          <Backbutton Redirect="/painel" />
          <h2>Preencha os dados abaixo</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            name="email"
            label="E-mail"
            placeholder="example@mail.com"
            inputRef={register({
              required: 'Preencha o campo com o email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Digite um endereço de e-mail válido',
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <Select
            className="select-register"
            value={dataTypeUser.find((obj) => obj.value === selectedValueUser)}
            options={dataTypeUser}
            onChange={(e) => setSelectedValueUser(e.value)}
            styles={customStyles}
          />
          <button className="btn-submit" type="submit">
            ENVIAR
          </button>
        </form>
      </main>
    </div>
  );
};

export default RegisterUser;
