import { Injectable } from '@angular/core';

import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loginSuccess, loginFailure } from './user.actions';
import { AuthService } from '../../auth/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ISignInValues } from '../../shared/interfaces/auth.interfaces';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Login] User Login'),
      switchMap(({ email, password }: ISignInValues) =>
        this.authService.signIn({ email, password }).pipe(
          map((user) => loginSuccess({ user: user })),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );
}
