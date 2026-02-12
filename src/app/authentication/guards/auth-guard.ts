import { inject } from '@angular/core';
import { RedirectCommand, Router, UrlTree, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem('accessToken');
  const router = inject(Router);
  if (!accessToken) {
    const loginPath = router.parseUrl('/login');
    return new RedirectCommand(loginPath, {
      skipLocationChange: false,
    });
  }
  return true;
};
