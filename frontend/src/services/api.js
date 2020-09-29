import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.204:3333', // endereço da rede, ou localhost
});

export default api
