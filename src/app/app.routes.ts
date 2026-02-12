import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/pages/login/login';
import { HomeComponent } from './home/pages/home/home';
import { authGuard } from './authentication/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
];
