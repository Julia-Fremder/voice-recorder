import axios from 'axios';

const urlApi = process.env.REACT_APP_API;

const http = axios.create({
  baseURL: urlApi,
});

http.defaults.headers['content-type'] = 'application/json';

export default http;
