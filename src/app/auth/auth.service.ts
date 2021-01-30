import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private timer: any;

  user = new BehaviorSubject<User>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  signup(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${'AIzaSyDY-gvq39qunzlCxRT8v0s4ifw_5Ukd5vU'}`,
        { email, password, returnSecureToken: true },
      )
      .pipe(
        tap(this.handleAuthentication.bind(this)),
        catchError(this.handleError),
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${'AIzaSyDY-gvq39qunzlCxRT8v0s4ifw_5Ukd5vU'}`,
        { email, password, returnSecureToken: true },
      )
      .pipe(
        tap(this.handleAuthentication.bind(this)),
        catchError(this.handleError),
      );
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('RecipesShoppingList@user');

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.router.navigate(['/auth']);
  }

  autoLogin(): void {
    const userJson = localStorage.getItem('RecipesShoppingList@user');

    if (!userJson) return;

    const { email, id, _token, _tokenExpiration } = JSON.parse(userJson);
    const user = new User(email, id, _token, new Date(_tokenExpiration));

    if (!user.token) return;

    const expiresInMs =
      new Date(_tokenExpiration).getTime() - new Date().getTime();

    if (expiresInMs <= 0) return;

    this.autoLogout(expiresInMs);

    this.user.next(user);
  }

  autoLogout(expirationMs: number) {
    this.timer = setTimeout(this.logout, expirationMs);
  }

  private handleAuthentication({
    email,
    localId,
    idToken,
    expiresIn,
  }: AuthResponse) {
    const expirationDate = new Date().getTime() + 1000 * +expiresIn;
    const user = new User(email, localId, idToken, new Date(expirationDate));

    this.autoLogout(1000 * +expiresIn);

    this.user.next(user);

    localStorage.setItem('RecipesShoppingList@user', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse) {
    const message = error?.error?.error?.message;

    if (!message) return throwError('An error ocurred!');

    switch (message) {
      case 'EMAIL_EXISTS':
        return throwError('This e-mail already exists!');

      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        return throwError('Invalid credentials!');

      default:
        return throwError(`An error ocurred: ${message}`);
    }
  }
}
