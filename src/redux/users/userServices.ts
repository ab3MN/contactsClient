import axios from 'axios';
import { Dispatch } from 'react';
import {
  authUserType,
  loginUserType,
  signUpUserType,
  USER_TYPES,
} from './usersActions';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;
const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + token;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const signUp =
  (email = '', password = '') =>
  async (d: Dispatch<signUpUserType>) => {
    try {
      d({ type: USER_TYPES.SIGN_UP_USER_START });

      const { data } = await axios.post('/users/signup', { email, password });
      d({
        type: USER_TYPES.SIGN_UP_USER_SUCCESS,
        payload: { user: data.user },
      });
    } catch (e) {
      d({
        type: USER_TYPES.SIGN_UP_USER_ERROR,
        payload: { error: e },
      });
    }
  };

export const login =
  (email = '', password = '') =>
  async (d: Dispatch<loginUserType>) => {
    try {
      d({ type: USER_TYPES.LOGIN_USER_START });

      const { data } = await axios.post('/users/login', { email, password });
      sessionStorage.setItem('token', data?.refreshToken);
      token.set(data?.refreshToken);
      d({
        type: USER_TYPES.LOGIN_USER_SUCCESS,
        payload: { user: data?.user },
      });
    } catch (e: any) {
      d({
        type: USER_TYPES.LOGIN_USER_ERROR,
        payload: { error: e?.message },
      });
    }
  };

export const auth = () => async (d: Dispatch<authUserType>) => {
  const _token = sessionStorage.getItem('token');
  _token && token.set(_token);

  try {
    d({ type: USER_TYPES.AUTH_USER_START });
    const { data } = await axios('/users/auth');
    d({ type: USER_TYPES.AUTH_USER_SUCCESS, payload: data });
  } catch (e) {
    d({ type: USER_TYPES.AUTH_USER_ERROR, payload: { error: e } });
  }
};

export const logOut = () => async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
    sessionStorage.removeItem('token');
  } catch (e) {}
};
