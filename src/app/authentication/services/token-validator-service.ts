import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenValidatorService {
  private jwtHelper = new JwtHelperService();
  isTokenValid(token: string): boolean {
    return !this.jwtHelper.isTokenExpired(token);
  }
}
