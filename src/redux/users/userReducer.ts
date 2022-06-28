import { combineReducers } from 'redux';
import { authUserType, IAuthUserSuccess, IAuthUserError } from './usersActions';
import {
  ILoginUserSuccess,
  loginUserType,
  ILoginUserError,
} from './usersActions';
import {
  ISignUpUserSuccess,
  USER_TYPES,
  ISignUpUserError,
  signUpUserType,
} from './usersActions';

const userReducer = (
  state = {},
  { type, payload }: ISignUpUserSuccess | ILoginUserSuccess | IAuthUserSuccess
) => {
  switch (type) {
    case USER_TYPES.SIGN_UP_USER_SUCCESS:
    case USER_TYPES.LOGIN_USER_SUCCESS:
    case USER_TYPES.AUTH_USER_SUCCESS:
      return payload.user || state;
    default:
      return state;
  }
};
const loadingReducer = (
  state = false,
  { type }: signUpUserType | loginUserType | authUserType
) => {
  switch (type) {
    case USER_TYPES.SIGN_UP_USER_START:
    case USER_TYPES.LOGIN_USER_START:
    case USER_TYPES.AUTH_USER_START:
      return true || state;
    case USER_TYPES.SIGN_UP_USER_SUCCESS:
    case USER_TYPES.LOGIN_USER_SUCCESS:
    case USER_TYPES.AUTH_USER_SUCCESS:
      return false || state;
    default:
      return state;
  }
};
const authReducer = (state: boolean = false, { type }: IAuthUserSuccess) => {
  switch (type) {
    case USER_TYPES.AUTH_USER_SUCCESS:
      return true || state;
    default:
      return state;
  }
};

const errorReducer = (
  state: any = null,
  { type, payload }: ISignUpUserError | ILoginUserError | IAuthUserError
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

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  loading: loadingReducer,
  isAuthenticated: authReducer,
});
