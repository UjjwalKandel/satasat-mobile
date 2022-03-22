import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.43.218:8084',
});

export const setAuthToken = token => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

export default instance;
