import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.sass'],
})
export class RecipesListComponent implements OnInit {
  @Output()
  onSelected = new EventEmitter<Recipe>();

  public recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'Description 1',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872',
    ),
    new Recipe(
      'Recipe 2',
      'Description 2',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872',
    ),
    new Recipe(
      'Recipe 3',
      'Description 3',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872',
    ),
  ];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onRecipeSelected(recipe: Recipe): void {
    this.onSelected.emit(recipe);
  }
}
