import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/user';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})

export class BlackjackComponent implements OnInit {
  loggedUser: User;
  myGames: User['games'];

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.login(null, null).subscribe(
      resp => {
        this.loggedUser = resp;
      }
    );
  }

}
