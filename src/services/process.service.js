import _ from 'lodash';
import axios from '../plugin/axios';

const create = (form) => {
  const {
    subject,
    notifying,
    notified,
    description,
    notified_number,
    notifying_number,
    userNotifying,
    selectedValueSubject,
    phone_notifying,
    addressNotifying,
    phone_notified,
    files,
    addressNotified,
    notified_complement,
    notifying_complement,
  } = form;
  const data = new FormData();

  data.append('subject', subject);
  data.append('description', description);
  data.append('type', selectedValueSubject);
  data.append('create_by_user', userNotifying);
  data.append('sender[name]', notifying);

  // eslint-disable-next-line camelcase
  if (phone_notifying && !_.isEmpty(phone_notifying)) {
    data.append('sender[phone]', phone_notifying);
  }

  if (addressNotifying && !_.isEmpty(addressNotifying)) {
    data.append('sender[address][description]', addressNotifying.logradouro);
    data.append('sender[address][number]', notifying_number);
    data.append('sender[address][complement]', notifying_complement);
    data.append('sender[address][zipcode]', addressNotifying.cep.replace('-', ''));
    data.append('sender[address][neighborhood]', addressNotifying.bairro);
    data.append('sender[address][city]', addressNotifying.localidade);
    data.append('sender[address][uf]', addressNotifying.uf);
    data.append('sender[address][country]', 'BRA');
  }

  data.append('receiver[name]', notified);

  // eslint-disable-next-line camelcase
  if (phone_notified && !_.isEmpty(phone_notified)) {
    data.append('receiver[phone]', phone_notified);
  }

  if (addressNotified && !_.isEmpty(addressNotified)) {
    data.append('receiver[address][description]', addressNotified.logradouro);
    data.append('receiver[address][zipcode]', addressNotified.cep.replace('-', ''));
    data.append('receiver[address][number]', notified_number);
    data.append('receiver[address][complement]', notified_complement);
    data.append('receiver[address][neighborhood]', addressNotified.bairro);
    data.append('receiver[address][city]', addressNotified.localidade);
    data.append('receiver[address][uf]', addressNotified.uf);
    data.append('receiver[address][country]', 'BRA');
  }

  files.map((value) => data.append('receipt[]', value));

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  axios.post('/api/processes', data, config);
};

const update = (form, id) => {
  const {
    subject,
    notifying,
    notified,
    description,
    notified_number,
    notifying_number,
    userNotifying,
    selectedValueSubject,
    phone_notifying,
    addressNotifying,
    phone_notified,
    files,
    oldIdFiles,
    addressNotified,
    notified_complement,
    notifying_complement,
  } = form;
  const data = new FormData();

  data.append('subject', subject);
  data.append('description', description);
  data.append('type', selectedValueSubject);
  data.append('create_by_user', userNotifying);
  data.append('sender[name]', notifying);

  // eslint-disable-next-line camelcase
  if (phone_notifying && !_.isEmpty(phone_notifying)) {
    data.append('sender[phone]', phone_notifying);
  }

  if (addressNotifying && !_.isEmpty(addressNotifying)) {
    data.append('sender[address][description]', addressNotifying.logradouro);
    data.append('sender[address][number]', notifying_number);
    data.append('sender[address][complement]', notifying_complement);
    data.append('sender[address][zipcode]', addressNotifying.cep.replace('-', ''));
    data.append('sender[address][neighborhood]', addressNotifying.bairro);
    data.append('sender[address][city]', addressNotifying.localidade);
    data.append('sender[address][uf]', addressNotifying.uf);
    data.append('sender[address][country]', 'BRA');
  }

  data.append('receiver[name]', notified);

  // eslint-disable-next-line camelcase
  if (phone_notified && !_.isEmpty(phone_notified)) {
    data.append('receiver[phone]', phone_notified);
  }

  if (addressNotified && !_.isEmpty(addressNotified)) {
    data.append('receiver[address][description]', addressNotified.logradouro);
    data.append('receiver[address][zipcode]', addressNotified.cep.replace('-', ''));
    data.append('receiver[address][number]', notified_number);
    data.append('receiver[address][complement]', notified_complement);
    data.append('receiver[address][neighborhood]', addressNotified.bairro);
    data.append('receiver[address][city]', addressNotified.localidade);
    data.append('receiver[address][uf]', addressNotified.uf);
    data.append('receiver[address][country]', 'BRA');
  }

  files.map((value) => data.append('receipt[]', value));
  oldIdFiles.map((value) => data.append('receipt[]', value));

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  axios.put(`/api/processes/${id}`, data, config);
};

const index = () => axios.get('/api/processes?value=&type=code');
/* eslint-disable */
const search = ({ type, value }) =>
  axios.get(`/api/search/process?value=${value}&type=${type}`, {
    paramas: {
      value,
      type,
    },
  });

const assignMediator = ({ number_document, id }) =>
  axios.put(`/api/designate/mediator/${id}`, { number_document });

/* eslint-enable */

// const update = ({ data, id }) => axios.put(`/api/processes/${id}`, data);

const log = ({ data }) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios.post('/api/log', data, config);
};
const show = ({ id }) => axios.get(`/api/processes/${id}`);

const deleteProgress = ({ id }) => axios.delete(`/api/log/${id}`);

const updateProgress = ({ data, id }) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios.put(`/api/log/${id}`, data, config);
};

const isAuthenticated = () => localStorage.getItem('jwt_token') !== null;

export default {
  create,
  isAuthenticated,
  index,
  search,
  log,
  show,
  assignMediator,
  update,
  deleteProgress,
  updateProgress,
};
