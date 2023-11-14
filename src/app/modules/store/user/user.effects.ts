import { Injectable } from '@angular/core';

import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loginSuccess, loginFailure } from './user.actions';
import { AuthService } from '../../auth/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ISignInValues } from '../../shared/interfaces/auth.interfaces';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Login] User Login'),
      switchMap(({ email, password }: ISignInValues) =>
        this.authService.signIn({ email, password }).pipe(
          map((user) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Logged successfully!',
            });
            this.router.navigate(['/timeline']);
            return loginSuccess({ user: user });
          }),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  user$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[User] Get user'),
      switchMap(() =>
        this.authService.checkUser().pipe(
          map((user) => {
            return loginSuccess({ user: user });
          }),
          catchError((error) => {
            this.router.navigate(['/auth']);
            return of(loginFailure({ error }));
          })
        )
      )
    )
  );
}
