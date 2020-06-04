import {Component} from '@angular/core';
import {User} from './models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deck-of-cards-front';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  logout() {
    this.router.navigate(['/login']).then(r => this.authenticationService.logout());
  }
}
