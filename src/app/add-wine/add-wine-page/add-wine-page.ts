import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-wine-page',
  imports: [ReactiveFormsModule],
  templateUrl: './add-wine-page.html',
  styleUrl: './add-wine-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWinePage {
  private readonly httpClient = inject(HttpClient);

  wineForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    storageUnit: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    wineyard: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    type: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    vintage: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  onSubmitWine() {
    if (this.wineForm.valid === false) {
      console.log('Form is invalid');
      return;
    }
    console.log(this.wineForm.getRawValue());
    const value = this.wineForm.getRawValue();
    this.httpClient.post('/api/Wine', value).subscribe({
      next: (response) => {
        console.log('Wine added successfully:', response);
      },
      error: (error) => {
        console.error('Failed to add wine:', error);
      },
    });
  }
}
