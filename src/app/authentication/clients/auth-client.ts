import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { TokenValidatorService } from '../services/token-validator-service';

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  private readonly http = inject(HttpClient);
  private readonly tokenValidator = inject(TokenValidatorService);
  private _accessToken = signal<string | null>(localStorage.getItem('accessToken'));
  public readonly accessToken = computed(() => this._accessToken());

  public isLoggedIn = computed(() => {
    const token = this._accessToken();
    return token !== null && this.tokenValidator.isTokenValid(token);
  });

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
  public logout() {
    this._accessToken.set(null);
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
}
