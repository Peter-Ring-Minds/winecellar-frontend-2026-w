import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  private readonly http = inject(HttpClient);
  private _accessToken = signal<string | null>(localStorage.getItem('accessToken'));
  public readonly accessToken = computed(() => this._accessToken());
  public isLoggedIn = computed(() => this._accessToken() !== null);

  constructor() {
    effect(() => {
      const token = this._accessToken();
      if (token) {
        localStorage.setItem('accessToken', token);
      } else {
        localStorage.removeItem('accessToken');
      }
    });
  }

  public login(loginFormValue: { email: string; password: string }) {
    return this.http
      .post<{ accessToken: string }>('http://localhost:5132/auth/login', loginFormValue)
      .pipe(
        tap({
          next: (response) => {
            console.log('Login successful:', response);
            this._accessToken.set(response.accessToken);
          },
          error: (error) => {
            console.error('Login failed:', error);
          },
        }),
      );
  }

  public register(registerFormValue: { email: string; password: string }) {
    return this.http
      .post<{ accessToken: string }>('http://localhost:5132/auth/register', registerFormValue)
      .pipe(
        tap({
          next: (response) => {
            console.log('Registration successful:', response);
            this._accessToken.set(response.accessToken);
          },
          error: (error) => {
            console.error('Registration failed:', error);
          },
        }),
      );
  }
}
