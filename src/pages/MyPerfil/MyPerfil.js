import React, { useState } from 'react';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { useAlert } from 'react-alert';
import Navbar from '../../components/Navbar/Navbar';
import avatarIcon from '../../assets/avatar.png';

import Input from '../../components/Input/Input';
import BackButton from '../../components/BackButton/Backbutton';

import Auth from '../../services/auth.service';

import axios from 'axios'; //eslint-disable-line

import './MyPerfil.scss';
import '../../global.scss';

export default function MyPerfil() {
  const [dataUser, setDataUser] = useState(JSON.parse(localStorage.getItem('get_user')));
  const dataUserFullName = dataUser.name;
  const dataUserFirstName = dataUserFullName.split(' ')[0];
  const dataUserLastName = dataUserFullName.split(' ')[1];
  const id = dataUser.id;

  const alert = useAlert();

  const [styleButton, setStyleButton] = useState(false);
  const [first_name, setFirst_name] = useState(''); //eslint-disable-line
  const [last_name, setLast_name] = useState(''); //eslint-disable-line
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [phone, setPhone] = useState('');

  async function handleCep(cep) {
    if (cep.length === 8) {
      await axios
        .get(`https://viacep.com.br/ws/${cep}/json/`) //eslint-disable-line
        .then((response) => {
          setAddress(response.data);
          if (response.data.erro === true) alert.error('CEP não foi encontrado!');
        })
        .catch(() => {
          alert.error('CEP não foi encontrado!');
        });
    }
  }

  const blockInput = (
    <>
      <Input
        type="text"
        defaultValue={dataUserFirstName}
        name="first_name"
        label="Nome"
        onChange={(e) => setFirst_name(e.target.value)}
      />
      <Input
        type="text"
        defaultValue={dataUserLastName}
        name="last_name"
        label="Sobrenome"
        onChange={(e) => setLast_name(e.target.value)}
      />
      <Input
        type="text"
        defaultValue={dataUser.address.zipcode}
        name="zipcode"
        label="CEP"
        maxLength="8"
        onChange={(e) => handleCep(e.target.value)}
      />
      <Input
        type="number"
        defaultValue={dataUser.address.number}
        name="number"
        label="Número"
        onChange={(e) => setNumber(e.target.value)}
      />
      <Input
        type="text"
        defaultValue={dataUser.phone}
        name="phone"
        label="Telefone"
        onChange={(e) => setPhone(e.target.value)}
      />
    </>
  );

  const blockP = (
    <>
      <strong>Nome</strong>
      <p>{dataUserFirstName}</p>
      <strong>Sobrenome</strong>
      <p>{dataUserLastName}</p>
      <strong>CEP</strong>
      <p>{dataUser.address.zipcode}</p>
      <strong>Número</strong>
      <p>{dataUser.address.number}</p>
      <strong>Telefone</strong>
      <p>{dataUser.phone}</p>
    </>
  );

  async function handleUpdate(form) {
    try {
      const { data } = await Auth.update({ data: form, id });
      setDataUser(data);
      localStorage.setItem('get_user', JSON.stringify(data));
      alert.success('Dados salvos com sucesso');
      setStyleButton(false);
    } catch (error) {
      alert.error('Dados não foram salvos');
    }
  }

  function handleSendApi() {
    const data = new FormData();
    data.append('firs_name', first_name);
    data.append('last_name', last_name);
    data.append('phone', phone);
    data.append('address[complement]', null);
    data.append('address[description]', address.logradouro);
    data.append('address[zipcode]', address.cep.replace('-', ''));
    data.append('address[number]', number);
    data.append('address[neighborhood]', address.bairro);
    data.append('address[city]', address.localidade);
    data.append('address[uf]', address.uf);
    data.append('address[country]', 'BRA');
    handleUpdate(data);
  }

  async function handleChangeAvatar(e) {
    if (e.target.files) {
      const data = new FormData();
      data.append('avatar', e.target.files[0]);
      handleUpdate(data);
    }
  }

  return (
    <div className="my-profile-container">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="title">
          <BackButton Redirect="/painel" />
          <h2>Meu Perfil</h2>
        </div>
        <div className="avatar-information">
          <div className="avatar">
            <img src={dataUser.avatar ? dataUser.avatar : avatarIcon} alt="AvatarImage" />
            <label htmlFor="avatar">
              <input type="file" id="avatar" accept=".png, .jpeg" onChange={handleChangeAvatar} />
              <div className="fileIcon">
                <PhotoCameraIcon />
              </div>
            </label>
          </div>
          <div className="information">
            {styleButton ? blockInput : blockP}
            <div className="buttons">
              <button type="button" onClick={() => setStyleButton(true)} disabled={styleButton}>
                Editar
              </button>
              <button type="button" onClick={handleSendApi} disabled={!styleButton}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
