import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  template: ` <ng-content />`,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'ghost'>('primary');

  hostClasses = computed(() => {
    switch (this.variant()) {
      case 'primary':
        return `w-32 p-2 rounded-lg font-bold bg-[#A5846A] text-black`;
      case 'secondary':
        return `w-32 p-2 rounded-lg font-bold bg-stone-500 text-white`;
      case 'ghost':
        return `w-32 p-2 rounded-lg font-bold bg-transparent text-[#A5846A] border border-[#A5846A]`;
    }
  });
}
