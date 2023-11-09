import { createSelector } from '@ngrx/store';

const selectLogin = (state: any) => state.user;

export const selectUser = createSelector(selectLogin, (user) => user.user);

export const selectError = createSelector(selectLogin, (user) => user.user);
