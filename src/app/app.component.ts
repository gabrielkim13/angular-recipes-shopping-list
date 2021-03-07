import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Store } from '@ngrx/store';

import { LoggingService } from './logging.service';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('containerState', [
      state(
        'before',
        style({
          transform: 'translateY(-50%)',
          opacity: 0.5,
        }),
      ),
      state(
        'after',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        }),
      ),
      transition('before => after', animate(300)),
      transition('after => before', animate(0)),
    ]),
  ],
})
export class AppComponent implements OnInit {
  state = 'before';

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

  onRouteActivation(): void {
    setTimeout(() => {
      this.state = 'after';
    }, 1);
  }

  onRouteDeactivation(): void {
    this.state = 'before';
  }
}
