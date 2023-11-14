import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, editSuccess } from './user.actions';
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
  on(editSuccess, (state, { data, property }) => ({
    ...state,
    user: editProfile(state.user, property, data),
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

const createUser = (user: IUser) => {
  const {
    username,
    profilePicture,
    coverPicture,
    followers,
    followings,
    email,
  } = user;
  return new User(
    username,
    email,
    profilePicture,
    coverPicture,
    followers,
    followings
  );
};

const editProfile = (user: User | null, property: any, data: string) => {
  console.log(user);
  if (user) {
    const { followers, followings, ...object }: any = user;

    console.log(user);

    object[property as keyof typeof object] = data;

    return new User(
      object._username,
      object._email,
      object._profilePicture,
      object._coverPicture,
      followers,
      followings
    );
  }

  return null;
}; ////do poprawy
