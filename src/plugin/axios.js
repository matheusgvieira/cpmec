import axios from 'axios';

const req = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.jwt_token}`,
  },
});

req.interceptors.request.use(
  (data) => {
    data.headers.Authorization = localStorage.jwt_token ? `Bearer ${localStorage.jwt_token}` : '';
    localStorage.setItem('isLoading', true);
    return data;
  },
  (error) => Promise.reject(error),
);

req.interceptors.response.use(
  (response) => {
    localStorage.setItem('isLoading', false);
    return response;
  },
  (error) => Promise.reject(error),
);

export default req;
