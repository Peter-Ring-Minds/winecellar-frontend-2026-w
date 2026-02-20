import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'div[appListItem]',
  template: ` <ng-content />`,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ListItemComponent {
  variant = input<'box' | 'namebutton-box'>('box');

  hostClasses = computed(() => {
    switch (this.variant()) {
      case 'box':
        return `flex bg-[#A5846A]/80 flex-row justify-between rounded-lg`;
      case 'namebutton-box':
        return `w-3xl flex flex-col gap-4 bg-black/60 p-2 rounded-lg shadow-lg overflow-y-auto max-h-170`;
    }
  });
}
