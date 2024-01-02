import axios from "axios";

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 60000,
  validateStatus: (status: number) => status >= 200 && status < 300,
});

export default api;
