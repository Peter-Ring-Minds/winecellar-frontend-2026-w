import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthClient } from '../../clients/auth-client';

@Component({
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authClient = inject(AuthClient);
  private readonly router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue());
      const value = this.loginForm.getRawValue();
      this.authClient.login(value).subscribe({
        next: (accessToken) => {
          console.log('Login successful:', accessToken);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    }
  }
}
