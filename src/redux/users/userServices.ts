import axios from 'axios';
import { Dispatch } from 'react';
import { clearToken, setToken } from '../../helpers/token';
import { patchUserAvatarType } from './usersActions';
import {
  authUserType,
  IUserLogOut,
  loginUserType,
  signUpUserType,
  USER_TYPES,
} from './usersActions';

export const signUp =
  (email = '', password = '') =>
  async (d: Dispatch<signUpUserType>) => {
    try {
      d({ type: USER_TYPES.SIGN_UP_USER_START });

      const { data } = await axios.post('/users/signup', { email, password });
      setToken(data.refreshToken);

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
      setToken(data.refreshToken);
      const user = {
        ...data.user,
        refreshToken: data.refreshToken,
      };
      d({
        type: USER_TYPES.LOGIN_USER_SUCCESS,
        payload: { user },
      });
    } catch (e: any) {
      d({
        type: USER_TYPES.LOGIN_USER_ERROR,
        payload: { error: e?.message },
      });
    }
  };

export const auth = () => async (d: Dispatch<authUserType>) => {
  try {
    d({ type: USER_TYPES.AUTH_USER_START });
    const { data } = await axios('/users/auth');
    d({ type: USER_TYPES.AUTH_USER_SUCCESS, payload: { user: data } });
  } catch (e) {
    d({ type: USER_TYPES.AUTH_USER_ERROR, payload: { error: e } });
  }
};

export const logOut = () => async (d: Dispatch<IUserLogOut>) => {
  try {
    await axios.get('/users/logout');
    clearToken();

    d({ type: USER_TYPES.USER_LOGOUT, payload: null });
  } catch (e) {}
};

export const changeUserAvatar =
  (formData: any) => async (d: Dispatch<patchUserAvatarType>) => {
    try {
      d({ type: USER_TYPES.PATCH_USER_AVATAR_START });
      const { data } = await axios.patch('/users/avatar', formData, {});
      const largeAvatarURL =
        '/' +
        data.largeAvatarURL.substring(
          data.largeAvatarURL.indexOf('/user/avatars/') + 1,
        );
      const smallAvatarURL =
        '/' +
        data.smallAvatarURL.substring(
          data.smallAvatarURL.indexOf('/user/avatars/') + 1,
        );
      d({
        type: USER_TYPES.PATCH_USER_AVATAR_SUCCESS,
        payload: {
          avatar: {
            smallAvatarURL,
            largeAvatarURL,
          },
        },
      });
    } catch (e) {
      d({ type: USER_TYPES.PATCH_USER_AVATAR_ERROR, payload: { error: e } });
    }
  };
