import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

export class RecipesService {
  recipes: Recipe[] = [];

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

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.onRecipesChanged.next();
  }
}
