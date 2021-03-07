import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  isAuthenticated = false;

  constructor(private readonly store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').subscribe(({ user }) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSaveData(): void {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData(): void {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
