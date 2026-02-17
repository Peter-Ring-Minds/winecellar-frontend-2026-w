import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './nav/navbar/navbar';
import { AuthClient } from './authentication/clients/auth-client';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly authClient = inject(AuthClient);
  private readonly router = inject(Router);

  private readonly location = inject(Location);

  protected readonly isLoggedIn = this.authClient.isLoggedIn;
  protected readonly url = signal(this.router.url);

  ngOnInit(): void {
    this.location.onUrlChange((url) => {
      this.url.set(url);
    });
  }

  protected readonly bgImageUrl = computed(() => {
    const currentUrl = this.url();
    if (currentUrl.length === 0) {
      return '';
    }
    if (currentUrl.includes('/login')) {
      return `bg-[url('/backgrounds/login-bg.png')]`;
    }
    if (currentUrl.includes('/home')) {
      return `bg-[url('/backgrounds/home-bg.png')]`;
    }
    if (currentUrl.includes('/cellar')) {
      return `bg-[url('/backgrounds/add-cellar-bg.png')]`;
    }
    return '';
  });

  protected readonly title = signal('winecellar-frontend-2026-w');
}
