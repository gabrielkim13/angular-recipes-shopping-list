import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

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

  constructor(private readonly shoppingListService: ShoppingListService) {}

  onAddClick(): void {
    const name = this.nameInputRef?.nativeElement.value;
    const amount = +this.amountInputRef?.nativeElement.value;

    if (!!name && !!amount) {
      const ingredient = new Ingredient(name, amount);

      this.shoppingListService.addIngredients([ingredient]);
    }
  }
}
