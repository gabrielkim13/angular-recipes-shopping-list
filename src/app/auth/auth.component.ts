import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent {
  isLoginMode = true;

  isLoading = false;

  error: string = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

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
      },
    );

    form.reset();
  }
}
