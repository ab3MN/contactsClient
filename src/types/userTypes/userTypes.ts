export interface IUser {
  password: string;
  email: string;
  subscription: string;
  isActivated: boolean;
  role: string;
  smallAvatarURL: string;
  largeAvatarURL: string;
}

export interface IUserWithToken extends IUser {
  refreshToken: string;
}
