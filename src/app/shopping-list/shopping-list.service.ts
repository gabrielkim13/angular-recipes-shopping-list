import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Ingredient 1', 1),
    new Ingredient('Ingredient 2', 2),
    new Ingredient('Ingredient 3', 3),
  ];

  onAddIngredient = new EventEmitter<void>();

  get getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach(ingredient => this.addIngredient(ingredient));
    this.onAddIngredient.emit();
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
