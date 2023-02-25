import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/auth',
  withCredentials: true,
});

export default instance;