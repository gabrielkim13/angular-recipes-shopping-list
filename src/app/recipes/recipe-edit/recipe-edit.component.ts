import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass'],
})
export class RecipeEditComponent implements OnInit {
  id: number;

  isEdit = false;

  recipeForm: FormGroup;

  constructor(
    private readonly recipesService: RecipesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.isEdit = !!params.id;
    });

    this.initForm();
  }

  onSubmit(): void {
    const { name, description, imagePath, ingredients } = this.recipeForm
      .value as Recipe;

    const recipe = new Recipe(name, description, imagePath, ingredients);

    if (this.isEdit) {
      this.recipesService.updateRecipe(this.id, recipe);
    } else {
      this.recipesService.addRecipe(recipe);
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
      const recipe = this.recipesService.getRecipe(this.id);

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
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      ingredients: recipeIngredients,
    });
  }
}
