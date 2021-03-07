import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import * as RecipesActions from './store/recipes.actions';

import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private readonly store: Store<fromApp.AppState>,
    private readonly actions$: Actions,
  ) {}

  resolve(
    _1: ActivatedRouteSnapshot,
    _2: RouterStateSnapshot,
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.store.select('recipes').pipe(
      map(({ recipes }) => recipes),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());

          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1),
          );
        }

        return of(recipes);
      }),
    );
  }
}
