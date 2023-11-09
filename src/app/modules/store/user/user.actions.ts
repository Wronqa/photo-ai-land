import { createAction, props } from '@ngrx/store';
import { IUser } from '../../shared/interfaces/user.interface';

export const login = createAction(
  '[Login] User Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ user: IUser }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);
