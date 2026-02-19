import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageUnitClient } from '../../authentication/clients/storage-unit-client';
import { ButtonComponent } from '../../shared/ui/button/button';
import { ModalComponent } from '../../shared/ui/modal/modal';

@Component({
  selector: 'app-add-storage',
  imports: [ReactiveFormsModule, ButtonComponent, ModalComponent],
  templateUrl: './add-storage.html',
  styleUrl: './add-storage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStorage {
  private readonly storageUnitClient = inject(StorageUnitClient);

  cellarId = input.required<string>();
  storageAdded = output();
  closed = output();

  addStorageForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  showErrors = signal(false);

  onSubmit() {
    this.addStorageForm.markAllAsTouched();
    if (!this.addStorageForm.valid) {
      this.showErrors.set(true);
      return;
    }

    this.storageUnitClient
      .postStorageUnit(this.cellarId(), this.addStorageForm.controls.name.value)
      .subscribe({
        next: () => {
          this.storageAdded.emit();
          this.closed.emit();
        },
        error: (error) => {
          console.error('Failed to add storage unit:', error);
        },
      });
  }
}
