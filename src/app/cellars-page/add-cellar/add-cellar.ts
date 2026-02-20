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
  private readonly cellarClient = inject(CellarClient);

  cellarId = input.required<string>();
  cellarAdded = output();
  closed = output();

  addCellarForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  showErrors = signal(false);

  onSubmit() {
    this.addCellarForm.markAllAsTouched();
    if (!this.addCellarForm.valid) {
      this.showErrors.set(true);
      return;
    }

    this.cellarClient.postCellar(this.addCellarForm.value.name ?? '').subscribe({
      next: () => {
        this.cellarAdded.emit();
        this.closed.emit();
      },
      error: (error) => {
        console.error('Failed to add cellar:', error);
      },
    });
  }
}
