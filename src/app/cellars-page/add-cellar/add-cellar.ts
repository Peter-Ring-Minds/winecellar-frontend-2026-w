import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../shared/ui/modal/modal';
import { CellarClient } from '../../authentication/clients/cellar-client';

@Component({
  selector: 'app-add-cellar',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './add-cellar.html',
  styleUrl: './add-cellar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCellarComponent {
  cellarId = input.required<string>();
  cellarAdded = output<string>();
  closed = output();

  addCellarForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  showErrors = signal(false);

  onSubmit() {
    this.addCellarForm.markAllAsTouched();

    const value = this.addCellarForm.getRawValue();

    if (!this.addCellarForm.valid) {
      this.showErrors.set(true);
      return;
    }

    if (!value.name || value.name.trim() === '') {
      return;
    }

    this.cellarAdded.emit(value.name.trim());
  }
}
