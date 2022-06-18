import axios from 'axios';
import { Dispatch } from 'react';
import { signUpUserType, USER_TYPES } from './usersActions';

axios.defaults.baseURL = 'http://localhost:5000';

export const signUp =
  (email = '', password = '') =>
  async (d: Dispatch<signUpUserType>) => {
    try {
      d({ type: USER_TYPES.SIGN_UP_USER_START });
      const res = await axios.post('/users/signup', { email, password });
      d({
        type: USER_TYPES.SIGN_UP_USER_SUCCESS,
        payload: { user: res.data.user },
      });
    } catch (e) {
      d({
        type: USER_TYPES.SIGN_UP_USER_ERROR,
        payload: { error: e },
      });
    }
  };
