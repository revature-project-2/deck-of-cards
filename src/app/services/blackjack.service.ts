import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class BlackjackService {

  constructor(private gServ: GameService) { }

  newGame() {
    this.gServ.addGame();
    console.log("This will ");
    
  }

  hit() {
    return this.gServ.pullCard(1);
    console.log("A card is pulled from GameService");
    
  }

  stand() {
    return 
  }

}
