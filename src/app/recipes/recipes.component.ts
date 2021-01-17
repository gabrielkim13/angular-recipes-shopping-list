import { Component } from '@angular/core';

import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass'],
})
export class RecipesComponent {
  selectedRecipe: Recipe;

  onRecipeSelected(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}
