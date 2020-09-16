import axios from '../plugin/axios';

const login = ({ email, password }) => axios.post('/api/auth/user', { email, password });

/* eslint-disable */
const createUser = ({
  first_name,
  last_name,
  phone,
  email,
  password,
  type_document,
  number_document,
  avatar,
  address: { description, zipcode, number, complement, neighborhood, city, uf, country },
}) =>
  axios.post('/api/user/create', {
    first_name,
    last_name,
    phone,
    email,
    password,
    type_document,
    number_document,
    avatar,
    address: { description, zipcode, number, complement, neighborhood, city, uf, country },
  });

/* eslint-disable */
const createMediator = ({
  first_name,
  last_name,
  phone,
  email,
  password,
  type_document,
  number_document,
  token,
  avatar,
  address: { description, zipcode, number, complement, neighborhood, city, uf, country },
}) =>
  axios.post('/api/user/create', {
    first_name,
    last_name,
    phone,
    email,
    password,
    type_document,
    number_document,
    token,
    avatar,
    address: { description, zipcode, number, complement, neighborhood, city, uf, country },
  });

/* eslint-disable */
const createAdministrator = ({
  first_name,
  last_name,
  phone,
  email,
  password,
  type_document,
  number_document,
  token,
  avatar,
  address: { description, zipcode, number, complement, neighborhood, city, uf, country },
}) =>
  axios.post('/api/user/create', {
    first_name,
    last_name,
    phone,
    email,
    password,
    type_document,
    number_document,
    token,
    avatar,
    address: { description, zipcode, number, complement, neighborhood, city, uf, country },
  });

const forgotPassword = ({ number_document }) => axios.post('/api/auth/forgot', { number_document });

const update = ({ data, id }) => axios.put(`/api/users/${id}`, data);

const newPassword = ({ password, token, id }) =>
  axios.put(`api/auth/new/password/${id}`, { password, token });
/* eslint-enable */

const insertUser = ({ email, type }) => axios.post('/api/created/user', { email, type });

const isGoogleAuth = async (form) => axios.post('/api/auth/google', form);

const isFacebookAuth = async (form) => axios.post('/api/auth/facebook', form);

const isAuthenticated = () => localStorage.getItem('jwt_token') !== null;

const checkToken = (token) => axios.get(`api/check/token/${token}`);

export default {
  login,
  isAuthenticated,
  createUser,
  forgotPassword,
  isGoogleAuth,
  update,
  isFacebookAuth,
  checkToken,
  createMediator,
  createAdministrator,
  insertUser,
  newPassword,
};
