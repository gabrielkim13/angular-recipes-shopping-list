import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { LoggingService } from './logging.service';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly loggingService: LoggingService,
    private readonly store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog('AppComponent.ngOnInit()');
  }
}
