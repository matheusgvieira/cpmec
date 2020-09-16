import React, { useState, useRef } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';

import Input from '../../components/Input/Input';
import GoogleAuth from '../../components/Button/SocialAuth';
import Facebook from '../../components/Button/Facebook';
import Navbar from '../../components/Navbar/Navbar';
import ModalLoader from '../../components/ModalLoader/ModalLoader';
import BackButton from '../../components/BackButton/Backbutton';

import Auth from '../../services/auth.service';

import './Login.scss';

export default function Login() {
  const [loading, setLoading] = useState(false);

  const typeUser = useParams();

  const history = useHistory();

  const alert = useAlert();

  const formSubmitRef = useRef();

  const { register, handleSubmit, errors } = useForm();

  async function onSubmit({ email, password }) {
    setLoading(true);
    try {
      const { data } = await Auth.login({ email, password });

      if (typeUser.userId === data.user.type_user.toLowerCase()) {
        if (data && data.token) {
          localStorage.setItem('get_user', JSON.stringify(data.user));
          localStorage.setItem('jwt_token', data.token);
          setLoading(false);
          history.push('/painel');
        }
      } else {
        switch (data.user.type_user.toLowerCase()) {
          case 'usuario':
            setLoading(false);
            alert.error('Faça o login como usuário');
            break;
          case 'mediador':
            setLoading(false);
            alert.error('Faça o login como mediador');
            break;
          case 'procurador':
            setLoading(false);
            alert.error('Faça o login como usuário');
            break;
          default:
            setLoading(false);
            alert.error('Faça o login como Administrador');
            break;
        }
      }
    } catch (error) {
      setLoading(false);
      alert.error('Dados de email ou senha inválidos');
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      formSubmitRef.current.click();
    }
  };

  return (
    <div className="login-container">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="title">
          <BackButton Redirect="/" />
          <h2>Faça seu login</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="email-password">
            <Input
              type="text"
              label="Email"
              name="email"
              inputRef={register({
                required: 'Preencha o campo com seu email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Entre com um email valido',
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <Input
              type="password"
              label="Senha"
              name="password"
              onKeyDown={handleKeyDown}
              inputRef={register({
                required: 'Preencha o campo com sua senha',
              })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </fieldset>
          <div className="buttons-login-register">
            <button type="submit" id={typeUser.userId} ref={formSubmitRef}>
              Login
            </button>
            <ModalLoader loading={loading} />
            {(typeUser.userId === 'usuario' || typeUser.userId === 'procurador') && (
              <button
                type="button"
                onClick={() => history.push(`/register/${typeUser.userId}`)}
                id={typeUser.userId}
              >
                Cadastrar
              </button>
            )}
          </div>
        </form>
        <div className="forgot-password">
          <Link to={`/forgot-password/${typeUser.userId}`}>Esqueci minha senha</Link>
        </div>
        <div className="google-login">
          <GoogleAuth />
        </div>
        <div className="facebook-login">
          <Facebook />
        </div>
      </main>
    </div>
  );
}
