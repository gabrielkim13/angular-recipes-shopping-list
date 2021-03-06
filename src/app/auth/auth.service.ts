import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private timer: ReturnType<typeof setTimeout>;

  constructor(private readonly store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationMs: number): void {
    this.timer = setTimeout(
      () => this.store.dispatch(new AuthActions.Logout()),
      expirationMs,
    );
  }

  clearLogoutTimer(): void {
    if (this.timer) clearTimeout(this.timer);

    this.timer = null;
  }
}
