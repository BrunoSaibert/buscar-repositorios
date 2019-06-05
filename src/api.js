import axois from 'axios';

const api = axois.create({
  baseURL: 'https://api.github.com',
})

export default api;