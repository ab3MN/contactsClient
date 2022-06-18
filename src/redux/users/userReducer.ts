import { combineReducers } from 'redux';
import {
  ISignUpUserSuccess,
  USER_TYPES,
  ISignUpUserError,
  signUpUserType,
} from './usersActions';

const userReducer = (state = {}, { type, payload }: ISignUpUserSuccess) => {
  switch (type) {
    case USER_TYPES.SIGN_UP_USER_SUCCESS:
      return payload.user;
    default:
      return state;
  }
};
const loadingReducer = (state = false, { type }: signUpUserType) => {
  switch (type) {
    case USER_TYPES.SIGN_UP_USER_START:
      return true;
    case USER_TYPES.SIGN_UP_USER_SUCCESS:
      return false;
    default:
      return state;
  }
};

const errorReducer = (
  state: any = null,
  { type, payload }: ISignUpUserError
) => {
  switch (type) {
    case USER_TYPES.SIGN_UP_USER_ERROR:
      return payload.error;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  loading: loadingReducer,
});
