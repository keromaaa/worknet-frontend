import axios from 'axios';
import { MyConfig } from '../app/app.config';

let token = '';

const localStorageToken = localStorage.getItem('Token') ?? null;
const sessionStorageToken = sessionStorage.getItem('Token');

if (localStorageToken && localStorageToken.length > 0) {
  token = localStorageToken;
} else if (
  !localStorageToken &&
  sessionStorageToken &&
  sessionStorageToken.length > 0
) {
  token = sessionStorageToken;
}

const apiclient = axios.create({
  baseURL: 'https://api.p2328.app.fit.ba/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    value: token,
  },
});

export default apiclient;
