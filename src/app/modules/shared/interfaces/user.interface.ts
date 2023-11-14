export interface IUser {
  username: string;
  email: string;
  profilePicture: string;
  coverPicture: string;
  followers: string[];
  followings: string[];
}
export interface IPasswords {
  password: string;
  newPassword: string;
  passwordConfirmation: string;
}
export interface IEmailChange {
  email: string;
  password: string;
}
