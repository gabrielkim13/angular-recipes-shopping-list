import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipesService } from 'src/app/recipes/recipes.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass'],
})
export class RecipeDetailComponent {
  id: number;

  recipe: Recipe;

  constructor(
    private readonly recipesService: RecipesService,
    private readonly shoppingListService: ShoppingListService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }

  onAddToShoppingListClick(): void {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipeClick(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipeClick(): void {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }
}
