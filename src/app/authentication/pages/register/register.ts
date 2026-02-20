import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RegisterForm } from '../../register-form/register-form';
import { AuthClient } from '../../clients/auth-client';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/ui/button/button';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RegisterForm],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly authClient = inject(AuthClient);
  private readonly router = inject(Router);

  onSubmit(credentials: { email: string; password: string }) {
    this.authClient.register(credentials).subscribe({
      next: (accessToken) => {
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      },
    });
  }
}
