import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://kwfl-es-7-17-7-uueakwh-arc.searchbase.io',
});

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Basic N2U4ZTY1ZGY3MGQ4OmYxZTVmMGYzLTgwZmEtNDg5My1hZTQ1LWE1YjUwYjk4NWI5YQ==`;
    return config;
  },
  error => Promise.reject(error)
);
export default instance;
