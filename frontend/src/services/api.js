import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.10.123:3333', // endereço da rede, ou localhost
});

export default api
