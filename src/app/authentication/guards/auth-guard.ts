import { inject } from '@angular/core';
import { RedirectCommand, Router, UrlTree, type CanActivateFn } from '@angular/router';
import { AuthClient } from '../clients/auth-client';

export const authGuard: CanActivateFn = (route, state) => {
  const authClient = inject(AuthClient);
  const isLoggedIn = authClient.isLoggedIn();

  const router = inject(Router);
  if (!isLoggedIn) {
    const loginPath = router.parseUrl('/login');
    return new RedirectCommand(loginPath, {
      skipLocationChange: false,
    });
  }
  return true;
};
