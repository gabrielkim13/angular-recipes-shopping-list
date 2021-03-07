import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';

import * as RecipesActions from '../store/recipes.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;

  isEdit = false;

  recipeForm: FormGroup;

  private subscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.isEdit = !!params.id;
    });

    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit(): void {
    const { name, description, imagePath, ingredients } = this.recipeForm
      .value as Recipe;

    const recipe = new Recipe(name, description, imagePath, ingredients);

    if (this.isEdit) {
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({ index: this.id, recipe }),
      );
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(recipe));
    }

    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }

  onCancel(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      }),
    );
  }

  get ingredientControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  private initForm(): void {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    const recipeIngredients = new FormArray([]);

    if (this.isEdit) {
      this.subscription = this.store
        .select('recipes')
        .pipe(
          map(({ recipes }) => recipes.find((_, index) => index === this.id)),
        )
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeDescription = recipe.description;
          recipeImagePath = recipe.imagePath;

          if (recipe.ingredients && recipe.ingredients.length > 0) {
            recipe.ingredients.forEach(value =>
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(value.name, [Validators.required]),
                  amount: new FormControl(value.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                }),
              ),
            );
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      ingredients: recipeIngredients,
    });
  }
}
