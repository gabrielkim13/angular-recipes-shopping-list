import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as RecipesActions from './recipes.actions';

import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient,
    private readonly store: Store<fromApp.AppState>,
  ) {}

  fetchEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() =>
        this.http.get<Recipe[]>(
          'https://angular-recipes-shopping-list-default-rtdb.firebaseio.com/recipes.json',
        ),
      ),
      map(recipes =>
        recipes.map(recipe => ({
          ...recipe,
          ingredients: recipe.ingredients ?? [],
        })),
      ),
      map(recipes => new RecipesActions.SetRecipes(recipes)),
    ),
  );

  storeEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_, { recipes }]) =>
          this.http.put(
            'https://angular-recipes-shopping-list-default-rtdb.firebaseio.com/recipes.json',
            recipes,
          ),
        ),
      ),
    { dispatch: false },
  );
}
