import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {Game} from 'src/app/models/game';

@Component({
  selector: 'app-mygames',
  templateUrl: './mygames.component.html',
  styleUrls: ['./mygames.component.css']
})

export class MygamesComponent implements OnInit {
  myGames: Game[];
  constructor(private authentService: AuthenticationService) { }

  ngOnInit() {
    this.myGames = this.authentService.currentUserValue.games;
    // this.myGames = JSON.parse(localStorage.getItem('currentUser')).games;
    console.log(this.myGames);
  }

}
