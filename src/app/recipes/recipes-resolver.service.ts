import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private readonly dataStorageService: DataStorageService,
    private readonly recipesService: RecipesService,
  ) {}

  resolve(
    _1: ActivatedRouteSnapshot,
    _2: RouterStateSnapshot,
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipesService.getRecipes;

    if (recipes.length === 0) return this.dataStorageService.fetchRecipes();

    return recipes;
  }
}
