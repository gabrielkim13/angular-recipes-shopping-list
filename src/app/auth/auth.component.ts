import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective)
  private alertHost: PlaceholderDirective;

  private alertCloseSubscription: Subscription;

  isLoginMode = true;

  isLoading = false;

  error: string = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnDestroy(): void {
    this.alertCloseSubscription?.unsubscribe();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    const { email, password } = form.value;

    this.isLoading = true;

    let authResponse$: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authResponse$ = this.authService.login(email, password);
    } else {
      authResponse$ = this.authService.signup(email, password);
    }

    authResponse$.subscribe(
      () => {
        this.isLoading = false;

        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;

        this.showErrorAlert();
      },
    );

    form.reset();
  }

  onHandleError(): void {
    this.error = null;
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
