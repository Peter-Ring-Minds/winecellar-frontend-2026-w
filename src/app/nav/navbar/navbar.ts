import { ChangeDetectionStrategy, Component , inject} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent 
{
  private readonly router = inject(Router);
  onSubmit(path : string) {
    this.router.navigate([path]);
  }

}
