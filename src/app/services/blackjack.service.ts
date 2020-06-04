import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from './game.service';
import { Deck } from '../models/deck';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class BlackjackService {
  newCard: Card;
  handlist = [];
  // sum = 0;
  constructor(private gServ: GameService, private http: HttpClient) { }

  newGame(): Observable<Deck> {
    return this.gServ.newGame();
  }

  getCard() {
    return this.gServ.draw(this.gServ.gameId, 1).pipe(
      map(res => {
        this.newCard = res[0];
        if (this.newCard.value === 'KING' || this.newCard.value === 'QUEEN' || this.newCard.value === 'JACK') {
          this.newCard.numValue = 10;
        } else if (this.newCard.value === 'ACE') {
          this.newCard.numValue = 1;
        } else {
          // tslint:disable-next-line
          this.newCard.numValue = parseInt(this.newCard.value);
        }
        // let tempSum = this.calculateHand() + this.newCard.numValue;
        this.handlist.push(this.newCard);
        this.calculateHand();
      })
    );
  }


  startNewGame() {
    this.newGame();
  }

  calculateHand() {
    let sum = 0;
    let aceInHand = false;
    for (const card of this.handlist) {
      if (card.value === 'ACE'){
        aceInHand = true;
      }
      sum += card.numValue;
    }
    if (sum <= 21 && aceInHand){
      if (sum + 10 <= 21){
        sum += 10;
      }
    }
    return sum;
  }

  getHandScore() {

  }

  hit() {
    this.getCard();
  }

  dealerTurn() {

  }

}
