import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoggingService } from '../logging.service';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass'],
})
export class ShoppingListComponent implements OnInit {
  public shoppingList: Observable<fromApp.AppState['shoppingList']>;

  constructor(
    private readonly loggingService: LoggingService,
    private readonly store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.shoppingList = this.store.select('shoppingList');

    this.loggingService.printLog('ShoppingListComponent.ngOnInit()');
  }

  onEditItem(index: number): void {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
