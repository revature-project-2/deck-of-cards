import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class BlackjackService {

  constructor(private gServ: GameService) { }

  newGame() {
    // this.gServ.addGame();
    // console.log("This will ");
    
  }

  hit() {
    // return this.gServ.
    
  }

  stand() {
    return null;
  }

}
