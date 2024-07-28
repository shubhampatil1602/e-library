import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
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