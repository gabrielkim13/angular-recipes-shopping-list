import { Component, Input } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass'],
})
export class RecipeDetailComponent {
  @Input()
  recipe: Recipe;

  constructor(private readonly shoppingListService: ShoppingListService) {}

  onAddToShoppingListClick(): void {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
