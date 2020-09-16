import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import Navbar from '../../components/Navbar/Navbar';

import Input from '../../components/Input/Input';
import AUTH from '../../services/auth.service';

import './NewPassword.scss';
import '../../global.scss';

export default function NewPassword() {
  const { token } = useParams();
  const history = useHistory();
  const alert = useAlert();
  const { handleSubmit, register } = useForm();
  // eslint-disable-next-line no-unused-vars
  const [tokenCreate, setTokenCreate] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await AUTH.checkToken(token);
        setTokenCreate(data);
        return true;
      } catch (err) {
        alert.error('Token inválido!!');
        return history.push('/');
      }
    }
    if (token) {
      fetchData();
    }
  }, [alert, history, token]);

  const onSubmit = async ({ password }) => {
    try {
      await AUTH.newPassword({ password, token: tokenCreate.token, id: tokenCreate.user_id });
      alert.success('Nova senha atualizada, faça o login novamente.');
      history.push('/login/user');
    } catch (error) {
      alert.error('Nova senha não foi atualizada.');
    }
  };

  return (
    <div className="new-password-container">
      <header>
        <Navbar />
      </header>

      <main>
        <div className="title">
          <h2>Defina sua nova senha</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nova senha"
            name="password"
            inputRef={register}
            type="password"
            placeholder="Digite sua nova senha"
          />
          <span className="info-password">
            A senha deve conter letras miniúsculas, maiúsculas e números. Exemplo: Abc123
          </span>
          <button className="button-save" type="submit">
            Salvar
          </button>
        </form>
      </main>
    </div>
  );
}
