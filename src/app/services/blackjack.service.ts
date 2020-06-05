import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameService} from './game.service';
import {Deck} from '../models/deck';
import {Card} from '../models/card';
import {Dealer} from '../models/dealer';
import {User} from '../models/user';
import {AuthenticationService} from './authentication.service';

enum States {
  Start, Dealing, Dealt, Stand, Blackjack, Win, Lose, Tie, Bust
}

const MESSAGE_WAIT = 500;

@Injectable({
  providedIn: 'root'
})
export class BlackjackService {
  newCard: Card;
  user: User;
  dealer = new Dealer();
  private _gameState: States;

  // handlist = [];
  // sum = 0;
  constructor(private gServ: GameService, private http: HttpClient, private authentService: AuthenticationService) {
    this.user = authentService.currentUserValue;
  }

  get gameState(): string {
    return States[this._gameState];
  }

  set gameState(s: string) {
    this._gameState = States[s];
  }

  // this.gameState = 'Start';

  newGame(): Observable<Deck> {
    this.gameState = 'Start';
    // make a database call to store game
    return this.gServ.newGame();
  }

  calculateHand(who) {
    let sum = 0;
    let aceInHand = false;
    for (const card of who.hand) {
      if (card.value === 'ACE') {
        aceInHand = true;
      }
      sum += card.numValue;
    }
    if (sum <= 21 && aceInHand) {
      if (sum + 10 <= 21) {
        sum += 10;
      }
    }
    if (sum === 21) {
      who.naturalBlackJack = true;
    }
    // who.handValue = sum;
    return sum;
  }

  getCard(who) {
    this.gServ.draw(this.gServ.getGameId(), 1).subscribe(
      res => {
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
        who.hand.push(this.newCard);
        who.handValue = this.calculateHand(who);
      }
    );
  }

  hit() { // hit button function on click
    this.getCard(this.user);
    setTimeout(() => {
      // this.calculateHand(this.user);
      if (this.user.handValue > 21) {
        this.user.bust = true;
        setTimeout(() => {
          this.gameState = 'Bust';
        }, MESSAGE_WAIT);
        this.dealerTurn();
      } else if (this.user.handValue === 21) {
        if (this.user.hand.length === 2) {
          this.user.naturalBlackJack = true;
          setTimeout(() => {
            this.gameState = 'Blackjack';
          }, MESSAGE_WAIT);
        } else {
          this.user.blackJack = true;
          setTimeout(() => {
            this.gameState = 'Win';
          }, MESSAGE_WAIT);
        }
        this.dealerTurn();
      }
    }, MESSAGE_WAIT);
  }

  stand() { // this is stand button function
    this.gameState = 'Stand';
    this.dealerTurn();
  }

  dealerTurn() {
    if (this.user.bust) { // if user busts, end round
      this.endRound();
    } else {
      if (this.dealer.handValue > 21) {
        this.dealer.bust = true;
        this.endRound();
      } else if (this.dealer.handValue === 21) {
        if (this.dealer.hand.length === 2) {
          this.dealer.naturalBlackJack = true;
          setTimeout(() => {
            this.gameState = 'Lose';
          }, MESSAGE_WAIT);
        } else {
          this.dealer.blackJack = true;
          setTimeout(() => {
            this.gameState = 'Lose';
          }, MESSAGE_WAIT);
        }
        this.endRound();
      } else if (this.dealer.handValue < 17){
        this.getCard(this.dealer);
        setTimeout(() => {
          this.dealerTurn();
        }, MESSAGE_WAIT);
      } else if (this.dealer.handValue >= 17) {
        this.endRound();
      }
    }
  }

  startRound() {

    this.user.hand = [];
    this.user.handValue = 0;
    this.user.naturalBlackJack = false;
    this.user.blackJack = false;
    this.user.bust = false;
    this.dealer.hand = [];
    this.dealer.handValue = 0;
    this.dealer.naturalBlackJack = false;
    this.dealer.blackJack = false;
    this.dealer.bust = false;
    this.getCard(this.user);
    this.getCard(this.user);
    this.getCard(this.dealer);
    this.getCard(this.dealer);
    if (this.dealer.naturalBlackJack || this.user.naturalBlackJack) {
      this.endRound();
    } else {
      this.gameState = 'Dealt';
    }
  }

  endRound() {
    if (this.user.bust) { // In the case that user busts, set user to lost
      this.gameState = 'Lost';
    } else if (this.dealer.bust) { // In the case of dealer busting, user wins
      this.gameState = 'Win';
    } else if (this.user.handValue > this.dealer.handValue) { // user has higher hand than dealer, user wins
      this.gameState = 'Win';
    } else if (this.dealer.handValue > this.user.handValue) { // dealer has higher hand than user, user loses
      this.gameState = 'Lost';
    } else if (this.user.handValue === this.dealer.handValue) { // if both players have same hand value
      if (this.user.naturalBlackJack && this.dealer.naturalBlackJack) { // if both have natural black jack they tie
        this.gameState = 'Tie';
      } else if (this.user.naturalBlackJack) { // if just user has natural black jack they win
        this.gameState = 'Blackjack';
      } else if (this.dealer.naturalBlackJack) { // if just dealer has natural black jack user loses
        this.gameState = 'Lost';
      } else {
        this.gameState = 'Tie';
      }
    }

  }
}
