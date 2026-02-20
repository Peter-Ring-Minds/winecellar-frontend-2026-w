import { ChangeDetectionStrategy, Component, input, model, output, signal } from '@angular/core';
import { ModalComponent } from '../modal/modal';

@Component({
  selector: 'app-confirmation',
  imports: [ModalComponent],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Confirmation {
  title = input('Are you sure?');

  confirmed = output();

  show = signal(false);

  close() {
    this.show.set(false);
  }

  onButtonClick() {
    this.show.set(true);
  }
}
