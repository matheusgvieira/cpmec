import React from 'react';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';

import { connect } from 'react-redux';

import PropTypes from 'prop-types'; //eslint-disable-line

import Input from '../../components/Input/Input';
import Navbar from '../../components/Navbar/Navbar';

import api from '../../services/contact.service';

import '../../global.scss';
import './contact.scss';

function Contact(props) {
  const { handleSubmit, register } = useForm();
  const alert = useAlert();
  const { dataTextSign } = props;

  // eslint-disable-next-line
  const onSubmit = ({ first_name, last_name, email, phone, subject, description }) => {
    const phoneContact = phone.replace('-', '').replace('(', '').replace(')', '');
    try {
      api.send({ first_name, last_name, email, phone: phoneContact, subject, description });
      alert.success('Mensagem enviado com sucesso');
    } catch (error) {
      alert.error('Erro no envio da mensagem');
    }
  };

  return (
    <div className="contact-container">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="main-title">
          <h1>Entre em contato conosco!</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="personal">
              <Input label="Nome" name="first_name" type="text" inputRef={register} />
              <Input label="Sobrenome" name="last_name" type="text" inputRef={register} />
            </section>
            <section className="email-phone">
              <Input
                label="Email"
                name="email"
                type="text"
                placeholder="exemplo@gmail.com"
                inputRef={register}
              />
              <Input
                label="Celular"
                type="text"
                mask="(99)99999-9999"
                placeholder="(00) 99000-9999"
                name="phone"
                inputRef={register}
              />
            </section>
            <section className="doubts">
              <Input
                type="text"
                label="Assunto"
                name="subject"
                defaultValue={dataTextSign[0]}
                inputRef={register}
              />
              <p>Mensagem:</p>
              <textarea
                name="description"
                id=""
                cols="30"
                rows="10"
                defaultValue={dataTextSign[1]}
                ref={register}
              />
              <button type="submit">Enviar Mensagem</button>
            </section>
          </form>
        </div>
      </main>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    dataTextSign: state.modal.dataTextSign,
  };
}
Contact.propTypes = {
  dataTextSign: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.string]))
    .isRequired,
};
export default connect(mapStateToProps)(Contact);
