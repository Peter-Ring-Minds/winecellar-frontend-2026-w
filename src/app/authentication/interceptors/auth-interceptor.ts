// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthClient } from '../clients/auth-client';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authClient = inject(AuthClient);
  const token = authClient.accessToken(); // read the signal

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};
