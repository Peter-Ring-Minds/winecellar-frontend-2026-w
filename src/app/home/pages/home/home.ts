import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../../nav/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  
}
