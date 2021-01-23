import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.sass'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];

  onRecipesChangedSubscription: Subscription;

  constructor(
    private readonly recipesService: RecipesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes;

    this.onRecipesChangedSubscription = this.recipesService.onRecipesChanged.subscribe(
      () => {
        this.recipes = this.recipesService.getRecipes;
      },
    );
  }

  ngOnDestroy(): void {
    this.onRecipesChangedSubscription.unsubscribe();
  }

  onNewRecipeClick(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
