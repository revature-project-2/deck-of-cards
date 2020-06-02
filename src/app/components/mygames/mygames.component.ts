import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-mygames',
  templateUrl: './mygames.component.html',
  styleUrls: ['./mygames.component.css']
})

export class MygamesComponent implements OnInit {
  loggedUser: User;
  myGames: User["games"];

  constructor(private authentService: AuthenticationService) { }

  ngOnInit() {
    this.authentService.login(null, null).subscribe(
      resp => {
        this.loggedUser = resp;
      }
    );
  }
  
}
