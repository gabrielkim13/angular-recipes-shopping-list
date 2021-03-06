import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer';

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
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<fromShoppingList.AppState>,
  ) {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }

  onAddToShoppingListClick(): void {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients),
    );
  }

  onEditRecipeClick(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipeClick(): void {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }
}
