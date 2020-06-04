import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from './game.service';
import { Deck } from '../models/deck';
import { Card } from '../models/card';
import { Dealer } from '../models/dealer';
import { User } from '../models/user';

enum States { 
  Start, Dealing, Dealt, Stay, Blackjack, Win, Lose, Tie, Bust
}

@Injectable({
  providedIn: 'root'
})
export class BlackjackService {
  user = new User();
  dealer = new Dealer();
  private _gameState : States;

  // handlist = [];
  // sum = 0;
  constructor(private gServ: GameService, private http: HttpClient) { }

  get gameState(): string {
    return States[this._gameState];
  }

  set gameState(s: string) {
    this._gameState = States[s];
  }
  newGame(): Observable<Deck> {
    // make a database call to store game
    return this.gServ.newGame();
  }

  getCard(hand: Card[]) {
    this.gServ.draw(this.gServ.gameId, 1).subscribe(res => {
      console.log(res);
      let newCard = res[0];
        if (newCard.value === 'KING' || newCard.value === 'QUEEN' || newCard.value === 'JACK') {
          newCard.numValue = 10;
        } else if (newCard.value === 'ACE') {
          newCard.numValue = 1;
        } else {
          // tslint:disable-next-line
          newCard.numValue = parseInt(newCard.value);
        }
        hand.push(newCard);
    })
    // return this.gServ.draw(this.gServ.gameId, 1).pipe(
    //   map(res => {
    //     this.newCard = res[0];
    //     if (this.newCard.value === 'KING' || this.newCard.value === 'QUEEN' || this.newCard.value === 'JACK') {
    //       this.newCard.numValue = 10;
    //     } else if (this.newCard.value === 'ACE') {
    //       this.newCard.numValue = 1;
    //     } else {
    //       // tslint:disable-next-line
    //       this.newCard.numValue = parseInt(this.newCard.value);
    //     }
    //     // let tempSum = this.calculateHand() + this.newCard.numValue;
    //     hand.push(this.newCard);
    //   })
    // );
  }

  startNewGame() {
    //this.gameState = 'Start';
    this.newGame();
  }

  calculateHand(hand: Card[]) {
    let sum = 0;
    let aceInHand = false;
    for (const card of hand) {
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

  hit() { // hit button function on click
    this.getCard(this.user.playerHand);
    const handScore = this.calculateHand(this.user.playerHand);
    if (handScore > 21) {
      this.user.bust = true;
      this.gameState = 'Bust';
      this.dealerTurn();
    }
    else if (handScore === 21) {
      if (this.user.playerHand.length === 2) {
        this.user.naturalBlackJack = true;
        this.gameState = 'Blackjack';
      } else {
        this.user.blackJack = true;
        this.gameState = 'Win';
      }
      this.dealerTurn();
    }
  }

  stand() { // this is stand button function
    this.gameState = 'Stay';
    this.dealerTurn();
  }

  dealerTurn() {
    if (this.user.bust) { // if user busts, end round
      this.endRound();
    } else {
      if(this.dealer.handValue > 21) {
        this.dealer.bust = true;
        this.endRound();
      } else if (this.dealer.handValue === 21) {
          if (this.dealer.dealerHand.length === 2) {
            this.dealer.naturalBlackJack = true;
          } else {
            this.dealer.blackJack = true;
          }
          this.endRound();
      } else if (this.dealer.handValue < 17){
        this.getCard(this.dealer.dealerHand);
        this.dealer.handValue = this.calculateHand(this.dealer.dealerHand);
        this.dealerTurn();
      } else if (this.dealer.handValue >= 17) {
        this.endRound();
      }
    }
  }

  startRound() {
    this.user.playerHand = [];
    this.user.handValue = 0;
    this.user.naturalBlackJack = false;
    this.user.blackJack = false;
    this.user.bust = false;
    this.dealer.dealerHand = [];
    this.dealer.handValue = 0;
    this.dealer.naturalBlackJack = false;
    this.dealer.blackJack = false;
    this.dealer.bust = false;
    this.getCard(this.user.playerHand);
    this.getCard(this.user.playerHand);
    this.user.handValue = this.calculateHand(this.user.playerHand);
    this.getCard(this.dealer.dealerHand);
    this.getCard(this.dealer.dealerHand);
    this.dealer.handValue = this.calculateHand(this.dealer.dealerHand);
  }

  endRound() {
    if (this.user.bust) { // In the case that user busts, set user to lost
      this.gameState = 'Lost';
    } else if (this.dealer.bust) { // In the case of dealer busting, user wins
      this.gameState = 'Win';
    } else if(this.user.handValue > this.dealer.handValue) { // user has higher hand than dealer, user wins
      this.gameState = 'Win';
    } else if (this.dealer.handValue > this.user.handValue) { // dealer has higher hand than user, user loses
      this.gameState = 'Lost';
    } else if (this.user.handValue === this.dealer.handValue) { // if both players have same hand value
        if(this.user.naturalBlackJack && this.dealer.naturalBlackJack) { // if both have natural black jack they tie
          this.gameState = 'Tie';
        } else if (this.user.naturalBlackJack) { // if just user has natural black jack they win
          this.gameState = 'Blackjack';
        } else if(this.dealer.naturalBlackJack) { // if just dealer has natural black jack user loses
          this.gameState = 'Lost';
        } else {
          this.gameState = 'Tie';
        }
    }

  }

}
