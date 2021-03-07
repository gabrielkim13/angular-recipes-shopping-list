import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';

import * as RecipesActions from '../store/recipes.actions';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  id: number;

  recipe: Recipe;

  subscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        map(({ id }) => +id),
        switchMap(id => {
          this.id = id;

          return this.store.select('recipes');
        }),
        map(({ recipes }) => recipes.find((_, index) => index === this.id)),
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }
}
