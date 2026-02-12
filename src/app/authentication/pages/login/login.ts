import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.http
        .post<{ accessToken: string }>('http://localhost:5132/auth/login', this.loginForm.value)
        .subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            localStorage.setItem('accessToken', response.accessToken);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Login failed:', error);
          },
        });
    }
  }
}
