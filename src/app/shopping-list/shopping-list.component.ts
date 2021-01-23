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

  onIngredientsChangedSubscription: Subscription;

  constructor(private readonly shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients;

    this.onIngredientsChangedSubscription = this.shoppingListService.onIngredientsChanged.subscribe(
      () => {
        this.ingredients = this.shoppingListService.getIngredients;
      },
    );
  }

  ngOnDestroy(): void {
    this.onIngredientsChangedSubscription.unsubscribe();
  }

  onEditItem(index: number): void {
    this.shoppingListService.startedEditing.next(index);
  }
}
