import { createSelector } from '@ngrx/store';

const selectLogin = (state: any) => state.user;

export const selectUser = createSelector(selectLogin, (user) => user.user);
export const selectProfilePhoto = createSelector(
  selectLogin,
  (user) => user.user.profilePicture
);

export const selectError = createSelector(selectLogin, (user) => user.user);
