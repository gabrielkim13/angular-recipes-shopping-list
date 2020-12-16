import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass'],
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = [
    new Ingredient('Ingredient 1', 1),
    new Ingredient('Ingredient 2', 2),
    new Ingredient('Ingredient 3', 3),
  ];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
