import * as AuthActions from './auth.actions';

import { User } from '../user.model';

export interface State {
  user: User | null;
  error: string | null;
  isLoading: boolean;
}

const initialState = {
  user: null,
  error: null,
  isLoading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions,
): State {
  switch (action.type) {
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return { ...state, error: null, isLoading: true };

    case AuthActions.SUCCESS:
      const { email, localId, idToken, expiresIn } = action.payload;

      const user = new User(email, localId, idToken, new Date(expiresIn));

      return { ...state, user, error: null, isLoading: false };

    case AuthActions.FAILURE:
      const error = action.payload;

      return { ...state, user: null, error, isLoading: false };

    case AuthActions.LOGOUT:
      return { ...state, user: null, error: null };

    default:
      return state;
  }
}
