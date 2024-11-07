import axios from 'axios';

const api = axios.create({
  baseURL: 'https://admin.iacapuro.com.br',
});

export default api;