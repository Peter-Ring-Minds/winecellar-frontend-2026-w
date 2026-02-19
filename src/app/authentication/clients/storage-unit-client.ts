import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class StorageUnitClient {
  private readonly httpClient = inject(HttpClient);

  public getStorageUnitsByCellar(cellarId: string) {
    return this.httpClient.get<StorageUnit[]>(
      `http://localhost:5132/api/StorageUnit/by-cellar/${cellarId}`
    );
  }

  public getWinesByStorageUnit(storageUnitId: string) {
    return this.httpClient.get<Wine[]>(
      `http://localhost:5132/api/Wine/by-storage-unit/${storageUnitId}`
    );
  }
}

export interface StorageUnit {
  storageUnitId: string;
  name: string;
  cellarId: string;
}

export interface Wine {
  wineId: string;
  name: string;
  wineyard: string;
  type: string;
  vintage: number;
  quantity: number;
  storageUnitId: string;
}
