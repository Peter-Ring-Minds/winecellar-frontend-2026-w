import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  template: ` <ng-content />`,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'icon' | 'ghost'>('primary');

  hostClasses = computed(() => {
    switch (this.variant()) {
      case 'primary':
        return `w-32 p-2 rounded-lg font-bold bg-[#A5846A] text-black hover:bg-stone-600`;
      case 'secondary':
        return `w-32 p-2 rounded-lg font-bold bg-stone-500 text-white cursor-pointer hover:bg-black/20`;
      case 'ghost':
        return `w-32 p-2 rounded-lg font-bold bg-transparent text-[#A5846A] border border-[#A5846A] cursor-pointer hover:bg-black/20`;
      case 'icon':
        return `w-32 p-2 rounded-full font-bold bg-transparent text-[#A5846A] cursor-pointer hover:bg-black/20`;
    }
  });
}
