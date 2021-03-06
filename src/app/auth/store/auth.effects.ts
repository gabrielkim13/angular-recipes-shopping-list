import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';

import { AuthService } from '../auth.service';
import { User } from '../user.model';

import { environment } from '../../../environments/environment';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  private handleSuccess({ email, localId, idToken, expiresIn }: AuthResponse) {
    const expiresInMs = 1000 + +expiresIn;

    const expirationDate = new Date().getTime() + expiresInMs;
    const user = new User(email, localId, idToken, new Date(expirationDate));

    localStorage.setItem('RecipesShoppingList@user', JSON.stringify(user));
    this.authService.setLogoutTimer(expiresInMs);

    return new AuthActions.Success({
      email,
      localId,
      idToken,
      expiresIn: expirationDate,
    });
  }

  private handleFailure(httpErrorResponse: HttpErrorResponse) {
    const message = httpErrorResponse?.error?.error?.message;

    let parsedMessage = 'An error occured!';

    if (message) {
      switch (message) {
        case 'EMAIL_EXISTS':
          parsedMessage = 'This e-mail already exists!';
          break;

        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
          parsedMessage = 'Invalid credentials!';
          break;

        default:
          parsedMessage = `An error ocurred: ${message}`;
      }
    }

    return of(new AuthActions.Failure(parsedMessage));
  }

  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap(({ payload: { email, password } }: AuthActions.LoginStart) =>
        this.http
          .post<AuthResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
            { email, password, returnSecureToken: true },
          )
          .pipe(map(this.handleSuccess), catchError(this.handleFailure)),
      ),
    ),
  );

  autoLoginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userJson = localStorage.getItem('RecipesShoppingList@user');

        const autoLoginFailedAction: Action = { type: 'AUTO_LOGIN_FAILED' };

        if (!userJson) return autoLoginFailedAction;

        const { email, id, _token, _tokenExpiration } = JSON.parse(userJson);
        const user = new User(email, id, _token, new Date(_tokenExpiration));

        if (!user.token) return autoLoginFailedAction;

        const expiresInMs =
          new Date(_tokenExpiration).getTime() - new Date().getTime();

        if (expiresInMs <= 0) return autoLoginFailedAction;

        this.authService.setLogoutTimer(expiresInMs);

        return new AuthActions.Success({
          email,
          localId: id,
          idToken: _token,
          expiresIn: _tokenExpiration,
        });
      }),
    ),
  );

  signupEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap(({ payload: { email, password } }: AuthActions.LoginStart) =>
          this.http
            .post<AuthResponse>(
              `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
              { email, password, returnSecureToken: true },
            )
            .pipe(map(this.handleSuccess), catchError(this.handleFailure)),
        ),
      ),
    { dispatch: false },
  );

  logoutEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          localStorage.removeItem('RecipesShoppingList@user');
          this.authService.clearLogoutTimer();

          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );

  redirectEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );
}
