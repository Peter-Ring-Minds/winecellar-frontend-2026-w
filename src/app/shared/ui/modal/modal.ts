import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'div[modal]',
  imports: [ButtonComponent],
  template: ` <div
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    (click)="onClose()"
  >
    <div
      class="w-md flex flex-col items-center bg-black/80 gap-4 p-8 rounded-lg shadow-lg"
      (click)="$event.stopPropagation()"
    >
      <h2 class="text-2xl font-bold text-white">{{ title() }}</h2>

      <ng-content />
      <div class="flex justify-end gap-2 mt-2">
        <button type="button" appButton variant="secondary" (click)="closed.emit()">
          {{ secondaryButtonText() }}
        </button>
        <button appButton variant="primary" type="submit" (click)="onSubmit.emit()">
          {{ primaryButtonText() }}
        </button>
      </div>
    </div>
  </div>`,
  host: {
    // '[class]': 'hostClasses()',
  },
})
export class ModalComponent {
  closed = output();
  onSubmit = output();
  title = input('');
  primaryButtonText = input('Add');
  secondaryButtonText = input('Cancel');
  onClose() {
    this.closed.emit();
  }
}
