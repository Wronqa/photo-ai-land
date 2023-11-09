import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from './user.actions';
import { User } from '../../shared/models/User';
import { IUser } from '../../shared/interfaces/user.interface';

export interface IState {
  user: User | null;
  error: string | null;
}

const initialState: IState = {
  user: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user: createUser(user),
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

const createUser = (user: IUser) => {
  const { username, profilePicture, coverPicture, followers, followings } =
    user;
  return new User(
    username,
    profilePicture,
    coverPicture,
    followers,
    followings
  );
};
