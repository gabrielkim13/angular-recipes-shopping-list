import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[] = [];

  onAddIngredientSubscription: Subscription;

  constructor(private readonly shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients;

    this.onAddIngredientSubscription = this.shoppingListService.onAddIngredient.subscribe(
      () => {
        this.ingredients = this.shoppingListService.getIngredients;
      },
    );
  }

  ngOnDestroy(): void {
    this.onAddIngredientSubscription.unsubscribe();
  }
}
