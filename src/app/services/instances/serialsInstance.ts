import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://arc-cluster-kwfl-acumatica-catalog-v7-536qcv.searchbase.io',
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
