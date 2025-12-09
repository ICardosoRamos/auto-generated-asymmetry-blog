import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  timeout: 8000,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error', error);
    return Promise.reject(error);
  }
);

export default client;
