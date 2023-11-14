import { createAction, props } from '@ngrx/store';
import { IUser } from '../../shared/interfaces/user.interface';
import { IPhotoRes } from '../../shared/interfaces/api.interfaces';

export const login = createAction(
  '[Login] User Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ user: IUser }>()
);

export const editSuccess = createAction(
  '[Profile] Edit Success',
  props<{ data: string; property: string }>()
);

export const getUser = createAction('[User] Get user');

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);
