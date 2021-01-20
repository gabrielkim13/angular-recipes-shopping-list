import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass'],
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = [];

  constructor(private readonly shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients;

    this.shoppingListService.onAddIngredient.subscribe(ingredient => {
      this.ingredients = this.shoppingListService.getIngredients;
    });
  }
}
