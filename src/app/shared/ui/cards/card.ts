import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'card[appCard]',
  template: ` <ng-content />`,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class CardComponent {
  variant = input<'box' | 'wide'>('box');

  hostClasses = computed(() => {
    switch (this.variant()) {
      case 'box':
        return `flex flex-col gap-4 bg-black/60 p-2 rounded-lg shadow-lg overflow-y-auto max-h-170`;
      case 'wide':
        return `w-3xl flex flex-col gap-4 bg-black/60 p-2 rounded-lg shadow-lg overflow-y-auto max-h-170`;
    }
  });
}
