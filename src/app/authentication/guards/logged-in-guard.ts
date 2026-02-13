import { RedirectCommand, Router, type CanActivateFn } from '@angular/router';
import { AuthClient } from '../clients/auth-client';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const authClient = inject(AuthClient);
  const isLoggedIn = authClient.isLoggedIn();

  const router = inject(Router);
  if (isLoggedIn) {
    const defaultPath = router.parseUrl('/');
    return new RedirectCommand(defaultPath, {
      skipLocationChange: false,
    });
  }
  return true;
};
