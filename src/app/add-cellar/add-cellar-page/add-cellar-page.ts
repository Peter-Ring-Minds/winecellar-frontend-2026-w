import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-add-cellar-page',
  imports: [ReactiveFormsModule],
  templateUrl: './add-cellar-page.html',
  styleUrl: './add-cellar-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCellarPage {
  private readonly httpClient = inject(HttpClient);
  protected listOfCellars$ = [this.httpGetCellars()];

  cellarForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  httpGetCellars(): Observable<any> {
    return this.httpClient.get('/api/Cellar');
  }

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
