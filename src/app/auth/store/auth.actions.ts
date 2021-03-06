import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login start';
export const SIGNUP_START = '[Auth] Signup start';
export const SUCCESS = '[Auth] Success';
export const FAILURE = '[Auth] Failure';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear error';
export const AUTO_LOGIN = '[Auth] Auto login';

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(
    public payload: {
      email: string;
      password: string;
    },
  ) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(
    public payload: {
      email: string;
      password: string;
    },
  ) {}
}

export class Success implements Action {
  readonly type = SUCCESS;

  constructor(
    public payload: {
      email: string;
      localId: string;
      idToken: string;
      expiresIn: number;
    },
  ) {}
}

export class Failure implements Action {
  readonly type = FAILURE;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | LoginStart
  | SignupStart
  | Success
  | Failure
  | Logout
  | ClearError
  | AutoLogin;
