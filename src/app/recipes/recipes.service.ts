import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

import { Recipe } from './recipe.model';

export class RecipesService {
  recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'Description 1',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872',
      [
        new Ingredient('Ingredient 1.1', 1),
        new Ingredient('Ingredient 1.2', 2),
        new Ingredient('Ingredient 1.3', 3),
      ],
    ),
    new Recipe(
      'Recipe 2',
      'Description 2',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872',
      [
        new Ingredient('Ingredient 2.1', 4),
        new Ingredient('Ingredient 2.2', 5),
        new Ingredient('Ingredient 2.3', 6),
      ],
    ),
    new Recipe(
      'Recipe 3',
      'Description 3',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872',
      [
        new Ingredient('Ingredient 3.1', 7),
        new Ingredient('Ingredient 3.2', 8),
        new Ingredient('Ingredient 3.3', 9),
      ],
    ),
  ];

  onRecipeSelected = new EventEmitter<Recipe>();

  get getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
