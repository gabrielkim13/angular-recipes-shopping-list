import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Ingredient 1', 1),
    new Ingredient('Ingredient 2', 2),
    new Ingredient('Ingredient 3', 3),
  ];

  onIngredientsChanged = new Subject<void>();

  startedEditing = new Subject<number>();

  get getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach(ingredient => this.addIngredient(ingredient));
    this.onIngredientsChanged.next();
  }

  updateIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.onIngredientsChanged.next();
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.onIngredientsChanged.next();
  }

  private addIngredient(ingredient: Ingredient): void {
    const ingredientIndex = this.ingredients.findIndex(
      ({ name }) => ingredient.name === name,
    );

    if (ingredientIndex === -1) {
      this.ingredients.push(ingredient);
    } else {
      this.ingredients[ingredientIndex].amount += ingredient.amount;
    }
  }
}
