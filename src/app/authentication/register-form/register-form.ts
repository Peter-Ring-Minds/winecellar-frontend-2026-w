import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  output,
  Output,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterForm {
  public buttonText = input('');
  public authSubmit = output<{ email: string; password: string }>();

  registerForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    repeatPassword: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  protected readonly passwordDoesntMatch = signal(false);

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    if (this.registerForm.value.password !== this.registerForm.value.repeatPassword) {
      this.passwordDoesntMatch.set(true);
      return;
    }
    this.passwordDoesntMatch.set(false);

    this.authSubmit.emit(this.registerForm.getRawValue());
  }
}
