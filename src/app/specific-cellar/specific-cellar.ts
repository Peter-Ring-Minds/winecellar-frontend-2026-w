import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CellarClient } from '../authentication/clients/cellar-client';
import { Cellar } from '../cellars-page/cellars-page';
import { StorageUnitClient } from '../authentication/clients/storage-unit-client';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-specific-cellar',
  imports: [CommonModule],
  templateUrl: './specific-cellar.html',
  styleUrl: './specific-cellar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecificCellar {
  private readonly route = inject(ActivatedRoute);
  private readonly cellarClient = inject(CellarClient);
  private readonly storageUnitClient = inject(StorageUnitClient);

  cellarId = signal<string>('');

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

  wineQuantities = signal<Map<string, number>>(new Map());

  get storageUnits() {
    const value = this.storageUnitsResource.value();
    return Array.isArray(value) ? value : [];
  }

  constructor() {
    this.route.params.subscribe((params) => {
      const id = params['id'] || '';
      this.cellarId.set(id);
    });

    effect(() => {
      const storageUnits = this.storageUnitsResource.value();
      if (!Array.isArray(storageUnits)) {
        return;
      }

      const quantityMap = new Map<string, number>();

      storageUnits.forEach((storageUnit) => {
        this.storageUnitClient.getWinesByStorageUnit(storageUnit.storageUnitId).subscribe({
          next: (wines) => {
            const totalQuantity = wines.reduce((sum, wine) => sum + wine.quantity, 0);
            quantityMap.set(storageUnit.storageUnitId, totalQuantity);
            this.wineQuantities.set(new Map(quantityMap));
          },
          error: (error) => {
            console.error(
              `Error fetching wines for storage unit ${storageUnit.storageUnitId}:`,
              error,
            );
            quantityMap.set(storageUnit.storageUnitId, 0);
            this.wineQuantities.set(new Map(quantityMap));
          },
        });
      });
    });
  }

  getWineQuantity(storageUnitId: string): number {
    return this.wineQuantities().get(storageUnitId) || 0;
  }
}
