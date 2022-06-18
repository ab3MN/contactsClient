import { IUser } from '../../types/userTypes/userTypes';
export enum USER_TYPES {
  SIGN_UP_USER_START = 'SIGN_UP_USER_START',
  SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS',
  SIGN_UP_USER_ERROR = 'SIGN_UP_USER_ERROR',

  LOGIN_USER_START = 'LOGIN_USER_START',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
}
export interface ISignUpUserStart {
  type: USER_TYPES.SIGN_UP_USER_START;
}
export interface ISignUpUserSuccess {
  type: USER_TYPES.SIGN_UP_USER_SUCCESS;
  payload: { user: IUser };
}
export interface ISignUpUserError {
  type: USER_TYPES.SIGN_UP_USER_ERROR;
  payload: { error: any };
}

export type signUpUserType =
  | ISignUpUserStart
  | ISignUpUserSuccess
  | ISignUpUserError;
