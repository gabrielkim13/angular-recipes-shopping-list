import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput')
  nameInputRef: ElementRef;

  @ViewChild('amountInput')
  amountInputRef: ElementRef;

  @Output()
  onAddIngredient = new EventEmitter<Ingredient>();

  onAddClick(): void {
    const name = this.nameInputRef?.nativeElement.value;
    const amount = +this.amountInputRef?.nativeElement.value;

    if (!!name && !!amount)
      this.onAddIngredient.emit(new Ingredient(name, amount));
  }
}
