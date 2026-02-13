import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './nav/navbar/navbar';
import { AuthClient } from './authentication/clients/auth-client';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly authClient = inject(AuthClient);
  protected readonly isLoggedIn = this.authClient.isLoggedIn;
  protected readonly bgImageUrl = computed(() => {
    const isLoggedIn = this.isLoggedIn();
    return isLoggedIn
      ? "bg-[url('/backgrounds/home-bg.png')]"
      : "bg-[url('/backgrounds/login-bg.png')]";
  });

  protected readonly title = signal('winecellar-frontend-2026-w');
}
