import React from 'react';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import Modal from 'react-awesome-modal';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import api from '../../services/contact.service';

import './ModalContato.scss';
import Input from '../Input/Input';

import { setVisibleModalContato } from '../../store/actions/modalAction';

function ModalContato(props) {
  const { visibleContato, setVisibleContato, dataTextSign } = props;

  const { handleSubmit, register } = useForm();
  const alert = useAlert();

  // eslint-disable-next-line
  const onSubmit = ({ first_name, last_name, email, phone, subject, description }) => {
    const phoneContact = phone.replace('-', '').replace('(', '').replace(')', '');
    try {
      api.send({ first_name, last_name, email, phone: phoneContact, subject, description });
      alert.success('Mensagem enviado com sucesso');
      setVisibleContato(false);
    } catch (error) {
      alert.error('Erro no envio da mensagem');
    }
  };

  return (
    <div className="modal-contact-container">
      <button type="button" onClick={() => setVisibleContato(true)} className="button-nav">
        Contato
      </button>
      <Modal
        visible={visibleContato}
        width="40%"
        height="605px"
        effect="fadeInDown"
        onClickAway={() => setVisibleContato(false)}
      >
        <div className="screenModal">
          <div className="contact-title">
            <h1>Contato</h1>
            <IconButton onClick={() => setVisibleContato(false)}>
              <Close />
            </IconButton>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contact-body">
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
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    visibleContato: state.modal.visibleContato,
    dataTextSign: state.modal.dataTextSign,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setVisibleContato(newState) {
      const action = setVisibleModalContato(newState);
      dispatch(action);
    },
  };
}

ModalContato.propTypes = {
  visibleContato: PropTypes.bool.isRequired,
  dataTextSign: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.string]))
    .isRequired,
  setVisibleContato: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContato);
