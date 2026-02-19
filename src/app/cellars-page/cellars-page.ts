import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { CellarClient } from '../authentication/clients/cellar-client';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cellars-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './cellars-page.html',
  styleUrl: './cellars-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellarsPage {
  private readonly cellarClient = inject(CellarClient);
  protected cellarsResource = rxResource({
    stream: () => this.cellarClient.getCellars(),
    defaultValue: [],
  });

  cellarForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  onSubmitCellar() {
    if (this.cellarForm.valid === false) {
      return;
    }
    this.cellarClient.postCellar(this.cellarForm.value.name ?? '').subscribe({
      next: () => {
        this.cellarsResource.reload();
        this.cellarForm.reset();
      },
      error: (error) => {
        console.error('Failed to add cellar:', error);
      },
    });
  }
}
