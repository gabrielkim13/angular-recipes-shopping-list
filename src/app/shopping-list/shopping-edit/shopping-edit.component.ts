import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  private editedItemIndex: number;

  private editedItem: Ingredient;

  @ViewChild('form')
  form: NgForm;

  editMode = false;

  constructor(private readonly shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      index => {
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editMode = true;

        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    const { name, amount } = form.value;

    if (!!name && !!amount) {
      const ingredient = new Ingredient(name, amount);

      if (this.editMode) {
        this.shoppingListService.updateIngredient(
          this.editedItemIndex,
          ingredient,
        );
      } else {
        this.shoppingListService.addIngredients([ingredient]);
      }

      this.editMode = false;
      form.reset();
    }
  }

  onClear(): void {
    this.form.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
