export interface IUser {
  password: string;
  email: string;
  subscription: string;
  isActivated: boolean;
  role: string;
  smallAvatarURL: string;
  largerAvatarURL: string;
}

export interface IUserWithToken extends IUser {
  refreshToken: string;
}
