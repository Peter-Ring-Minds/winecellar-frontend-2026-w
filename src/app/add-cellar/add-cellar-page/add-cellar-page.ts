import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-add-cellar-page',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './add-cellar-page.html',
  styleUrl: './add-cellar-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCellarPage implements OnInit {
  private readonly httpClient = inject(HttpClient);

  cellars$!: Observable<Cellar[]>;

  ngOnInit(): void {
    this.cellars$ = this.httpClient.get<Cellar[]>('http://localhost:5132/api/Cellar');
  }
  cellarForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  onSubmitCellar() {
    if (this.cellarForm.valid === false) {
      console.log('Cellarinput is bad and stupid :/');
      return;
    }
    console.log(this.cellarForm.getRawValue());
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
