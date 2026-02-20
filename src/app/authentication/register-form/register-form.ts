import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterForm {
  public buttonText = input('');
  public authSubmit = output<{ email: string; password: string }>();

  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        passwordValidators.minLength,
        passwordValidators.hasDigit,
        passwordValidators.hasUppercase,
        passwordValidators.hasNonAlphanumeric,
      ],
      nonNullable: true,
    }),
    repeatPassword: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

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

export const passwordValidators = {
  minLength: Validators.minLength(6),
  hasDigit: (control: AbstractControl) => (/\d/.test(control.value) ? null : { noDigit: true }),
  hasUppercase: (control: AbstractControl) =>
    /[A-Z]/.test(control.value) ? null : { noUppercase: true },
  hasNonAlphanumeric: (control: AbstractControl) =>
    /[^a-zA-Z0-9]/.test(control.value) ? null : { noNonAlphanumeric: true },
};
