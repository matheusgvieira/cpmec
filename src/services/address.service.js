import axios from 'axios';

const viacep = (cep) => axios.get(`https://viacep.com.br/ws/${cep}/json/`);

export { viacep };
