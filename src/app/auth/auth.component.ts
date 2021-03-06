import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective)
  private alertHost: PlaceholderDirective;

  private alertCloseSubscription: Subscription;

  private storeSubscription: Subscription;

  isLoginMode = true;

  isLoading = false;

  error: string = null;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('auth')
      .subscribe(({ error, isLoading }) => {
        this.isLoading = isLoading;
        this.error = error;

        if (this.error) this.showErrorAlert();
      });
  }

  ngOnDestroy(): void {
    this.alertCloseSubscription?.unsubscribe();
    this.storeSubscription?.unsubscribe();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    const { email, password } = form.value;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
    }

    form.reset();
  }

  onHandleError(): void {
    this.store.dispatch(new AuthActions.ClearError());
  }

  private showErrorAlert(): void {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent,
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory,
    );

    componentRef.instance.message = this.error;
    this.alertCloseSubscription = componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();

      this.alertCloseSubscription.unsubscribe();
    });
  }
}
