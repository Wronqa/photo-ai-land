import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  constructor(
    private _username: string,
    private _email: string,
    private _profilePicture: string,
    private _coverPicture: string,
    private _followers: string[],
    private _followings: string[]
  ) {}

  get username() {
    return this._username;
  }
  get email() {
    return this._email;
  }
  get profilePicture() {
    return this._profilePicture;
  }
  get coverPicture() {
    return this._coverPicture;
  }
  get followers() {
    return this._followers;
  }
  get followings() {
    return this._followings;
  }
}
