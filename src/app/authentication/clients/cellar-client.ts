import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CellarClient {
  private readonly httpClient = inject(HttpClient);

  public getCellars() {
    return this.httpClient.get<Cellar[]>('http://localhost:5132/api/Cellar');
  }

  public getCellar(id: string) {
    return this.httpClient.get<Cellar>(`http://localhost:5132/api/Cellar/${id}`);
  }

  public putCellar(cellarName: string, cellarId: string) {
    return this.httpClient.put(`http://localhost:5132/api/Cellar/${cellarId}`, cellarName).pipe(
      tap({
        next: (response) => {
          console.log('Cellar put Successful:', response);
        },
        error: (error) => {
          console.error('Cellar put failed', error);
        },
      }),
    );
  }

  public postCellar(cellarName: string) {
    return this.httpClient.post(`http://localhost:5132/api/Cellar`, cellarName).pipe(
      tap({
        next: (response) => {
          console.log('Cellar post successful:', response);
        },
        error: (error) => {
          console.error('Cellar post failed', error);
        },
      }),
    );
  }

  public deleteCellar(id: string) {
    return this.httpClient.delete(`http://localhost:5132/api/Cellar/${id}`).pipe(
      tap({
        next: (response) => {
          console.log('Cellar delete successful');
        },
        error: (error) => {
          console.error('Cellar delete failed');
        },
      }),
    );
  }
}

export interface Cellar {
  cellarId: number;
  userId: Number;
  name: string;
}
