import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  private editedItem: Ingredient;

  @ViewChild('form')
  form: NgForm;

  editMode = false;

  constructor(private readonly store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe(({ editedIngredient, editedIngredientIndex }) => {
        if (editedIngredientIndex !== -1) {
          this.editedItem = editedIngredient;
          this.editMode = true;

          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm): void {
    const { name, amount } = form.value;

    if (!!name && !!amount) {
      const ingredient = new Ingredient(name, amount);

      if (this.editMode) {
        this.store.dispatch(
          new ShoppingListActions.UpdateIngredient(ingredient),
        );
      } else {
        this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
      }

      this.editMode = false;
      form.reset();
    }
  }

  onClear(): void {
    this.form.reset();
    this.editMode = false;

    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
