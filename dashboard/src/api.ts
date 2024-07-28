import axios from 'axios';
import useTokenStore from './store';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: { email: string; password: string }) => {
  return api.post('/api/v1/users/login', data);
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post('/api/v1/users/register', data);
};

export const getBooks = async () => {
  return api.get('/api/v1/books');
};

export const createBook = async (data: FormData) => {
  return api.post('/api/v1/books', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
