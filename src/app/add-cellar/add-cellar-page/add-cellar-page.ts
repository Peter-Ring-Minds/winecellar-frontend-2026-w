import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-cellar-page',
  imports: [ReactiveFormsModule],
  templateUrl: './add-cellar-page.html',
  styleUrl: './add-cellar-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCellarPage {
  private readonly httpClient = inject(HttpClient);

  protected cellarsResource = rxResource({
    stream: () => this.httpClient.get<Cellar[]>('http://localhost:5132/api/Cellar'),
    defaultValue: [],
  });

  cellarForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  onSubmitCellar() {
    if (this.cellarForm.valid === false) {
      return;
    }
    const value = this.cellarForm.getRawValue();
    this.httpClient.post('/api/Cellar', value).subscribe({
      next: (response) => {
        console.log('Cellar added successfully:', response);
      },
      error: (error) => {
        console.error('Failed to add cellar:', error);
      },
    });
  }
}

export interface Cellar {
  cellarId: number;
  userId: Number;
  name: string;
}
