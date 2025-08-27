// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip'
});

export default api;