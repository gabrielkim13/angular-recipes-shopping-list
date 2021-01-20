import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.sass'],
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private readonly recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes;
  }
}
