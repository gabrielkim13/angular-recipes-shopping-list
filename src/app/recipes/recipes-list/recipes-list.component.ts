import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.sass'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];

  subscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('recipes')
      .subscribe(({ recipes }) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onNewRecipeClick(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
