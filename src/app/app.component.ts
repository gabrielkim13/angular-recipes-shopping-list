import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { Store } from '@ngrx/store';

import { isPlatformBrowser } from '@angular/common';
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
    @Inject(PLATFORM_ID)
    private readonly platformId: string,
  ) {}

  ngOnInit(): void {
    this.loggingService.printLog('AppComponent.ngOnInit()');

    if (isPlatformBrowser(this.platformId))
      this.store.dispatch(new AuthActions.AutoLogin());
  }
}
