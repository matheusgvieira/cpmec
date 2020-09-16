import axios from '../plugin/axios';

/* eslint-disable */
const send = ({ first_name, last_name, email, phone, subject, description }) =>
  axios.post('/api/contact/create', {
    first_name,
    last_name,
    email,
    phone,
    subject,
    description,
  });

export default { send };
