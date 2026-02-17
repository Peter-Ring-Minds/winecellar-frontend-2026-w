import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  output,
  Output,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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

  registerForm = new FormGroup(
    {
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      repeatPassword: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    },
    { validators: passWordMatchValidator },
  );

  protected readonly passwordDoesntMatch = signal(false);

  showErrors = signal(false);

  onSubmit() {
    this.showErrors.set(false);
    this.passwordDoesntMatch.set(false);

    this.registerForm.markAllAsTouched();
    if (!this.registerForm.valid) {
      this.showErrors.set(true);
      return;
    }
    if (this.registerForm.value.password !== this.registerForm.value.repeatPassword) {
      this.passwordDoesntMatch.set(true);
      this.showErrors.set(true);
      return;
    }

    this.authSubmit.emit(this.registerForm.getRawValue());
  }
}

const passWordMatchValidator = (control: AbstractControl) => {
  const passwordControl = control.get('password');
  const repeatPasswordControl = control.get('repeatPassword');

  if (passwordControl?.value !== repeatPasswordControl?.value) {
    return { passwordMismatch: true };
  }

  return null;
};
