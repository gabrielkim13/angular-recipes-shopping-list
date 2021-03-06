import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private readonly http: HttpClient,
    private readonly recipesService: RecipesService,
    private readonly authService: AuthService,
  ) {}

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes;

    this.http
      .put(
        'https://angular-recipes-shopping-list-default-rtdb.firebaseio.com/recipes.json',
        recipes,
      )
      .subscribe(console.log);
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        'https://angular-recipes-shopping-list-default-rtdb.firebaseio.com/recipes.json',
      )
      .pipe(
        map<Recipe[], Recipe[]>(recipes =>
          recipes.map(recipe => ({
            ...recipe,
            ingredients: recipe.ingredients ?? [],
          })),
        ),
        tap(recipes => this.recipesService.setRecipes(recipes)),
      );
  }
}
