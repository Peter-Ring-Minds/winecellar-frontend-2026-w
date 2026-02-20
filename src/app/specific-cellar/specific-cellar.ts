import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CellarClient } from '../authentication/clients/cellar-client';
import { Cellar } from '../authentication/clients/cellar-client';
import { StorageUnitClient } from '../authentication/clients/storage-unit-client';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { AddStorage } from './add-storage/add-storage';
import { ButtonComponent } from '../shared/ui/button/button';
import { Confirmation } from '../shared/ui/confirmation/confirmation';

@Component({
  selector: 'app-specific-cellar',
  imports: [CommonModule, AddStorage, ButtonComponent, Confirmation],
  templateUrl: './specific-cellar.html',
  styleUrl: './specific-cellar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecificCellar {
  private readonly route = inject(ActivatedRoute);
  private readonly cellarClient = inject(CellarClient);
  private readonly storageUnitClient = inject(StorageUnitClient);

  cellarId = signal<string>('');
  showAddStorage = signal(false);

  cellarResource = rxResource({
    stream: () => {
      const id = this.cellarId();
      if (!id) return of(null as Cellar | null);
      return this.cellarClient.getCellar(id);
    },
  });

  storageUnitsResource = rxResource({
    stream: () => {
      const id = this.cellarId();
      if (!id) {
        return of([]);
      }
      return this.storageUnitClient.getStorageUnitsByCellar(id);
    },
  });

  get storageUnits() {
    const value = this.storageUnitsResource.value();
    return Array.isArray(value) ? value : [];
  }

  constructor() {
    this.route.params.subscribe((params) => {
      const id = params['id'] || '';
      this.cellarId.set(id);
    });
  }

  onStorageAdded() {
    this.storageUnitsResource.reload();
  }

  OnDeleteStorageUnit(storageUnit: any) {
    this.storageUnitClient.deleteStorageUnit(storageUnit.storageUnitId).subscribe({
      next: () => {
        this.storageUnitsResource.reload();
      },
      error: (error) => {
        console.error('Failed to delete storage unit:', error);
      },
    });
  }
}
