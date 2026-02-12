import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/pages/login/login';
import { HomeComponent } from './home/pages/home/home';
import { authGuard } from './authentication/guards/auth-guard';

//Remember: ROUTE ORDER MATTERS! The first match will be used, so more specific routes should be defined before less specific ones.
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
