import { combineReducers } from 'redux';
import { IPatchUserAvatarSucces } from './usersActions';
import {
  ILoginUserSuccess,
  loginUserType,
  ILoginUserError,
  ISignUpUserSuccess,
  USER_TYPES,
  ISignUpUserError,
  signUpUserType,
  authUserType,
  IAuthUserSuccess,
  IAuthUserError,
  IUserLogOut,
} from './usersActions';

const userReducer = (
  state = {},
  {
    type,
    payload,
  }:
    | ISignUpUserSuccess
    | ILoginUserSuccess
    | IAuthUserSuccess
    | IUserLogOut
    | IPatchUserAvatarSucces,
) => {
  switch (type) {
    case USER_TYPES.SIGN_UP_USER_SUCCESS:
    case USER_TYPES.LOGIN_USER_SUCCESS:
    case USER_TYPES.AUTH_USER_SUCCESS:
      return payload.user || state;
    case USER_TYPES.USER_LOGOUT:
      return payload || state;
    case USER_TYPES.PATCH_USER_AVATAR_SUCCESS:
      return Object.assign({ ...state, avatart: { ...payload.avatar } });
    default:
      return state;
  }
};
const loadingReducer = (
  state = false,
  { type }: signUpUserType | loginUserType | authUserType | IUserLogOut,
) => {
  switch (type) {
    case USER_TYPES.SIGN_UP_USER_START:
    case USER_TYPES.LOGIN_USER_START:
    case USER_TYPES.AUTH_USER_START:
    case USER_TYPES.SIGN_UP_USER_ERROR:
    case USER_TYPES.LOGIN_USER_ERROR:
    case USER_TYPES.AUTH_USER_ERROR:
      return true || state;
    case USER_TYPES.SIGN_UP_USER_SUCCESS:
    case USER_TYPES.LOGIN_USER_SUCCESS:
    case USER_TYPES.AUTH_USER_SUCCESS:
    case USER_TYPES.USER_LOGOUT:
      return false || state;
    default:
      return state;
  }
};
const authReducer = (
  state = false,
  {
    type,
  }: IAuthUserSuccess | ILoginUserSuccess | ISignUpUserSuccess | IUserLogOut,
) => {
  switch (type) {
    case USER_TYPES.AUTH_USER_SUCCESS:
    case USER_TYPES.LOGIN_USER_SUCCESS:
    case USER_TYPES.SIGN_UP_USER_SUCCESS:
      return true;

    case USER_TYPES.USER_LOGOUT:
      return false;

    default:
      return state;
  }
};

const errorReducer = (
  state: any = null,
  { type, payload }: ISignUpUserError | ILoginUserError | IAuthUserError,
) => {
  switch (type) {
    case USER_TYPES.SIGN_UP_USER_ERROR:
    case USER_TYPES.LOGIN_USER_ERROR:
    case USER_TYPES.AUTH_USER_ERROR:
      return payload.error || state;
    default:
      return state;
  }
};
const tokenReducer = (
  state = '',
  { type, payload }: ISignUpUserSuccess | ILoginUserSuccess | IUserLogOut,
) => {
  switch (type) {
    case USER_TYPES.SIGN_UP_USER_SUCCESS:
    case USER_TYPES.LOGIN_USER_SUCCESS:
      return payload.user.refreshToken || state;

    case USER_TYPES.USER_LOGOUT:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  loading: loadingReducer,
  isAuthenticated: authReducer,
  token: tokenReducer,
});
