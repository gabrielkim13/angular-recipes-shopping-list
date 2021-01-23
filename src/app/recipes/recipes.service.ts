import { Subject } from 'rxjs';
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

  onRecipesChanged = new Subject<void>();

  get getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.onRecipesChanged.next();
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.onRecipesChanged.next();
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.onRecipesChanged.next();
  }
}
