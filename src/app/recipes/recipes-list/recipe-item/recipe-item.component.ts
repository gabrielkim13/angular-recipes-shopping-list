import { Component, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.sass'],
})
export class RecipeItemComponent {
  @Input()
  recipe: Recipe;

  constructor(private readonly recipesService: RecipesService) {}

  onRecipeClick(): void {
    this.recipesService.onRecipeSelected.emit(this.recipe);
  }
}
