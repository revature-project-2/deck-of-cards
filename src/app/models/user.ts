import {Game} from './game';
import {Card} from './card';

export class User {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  balance: number;
  games: Game[];
  handValue: number;
  bust: boolean;
  blackJack: boolean;
  naturalBlackJack: boolean;
  hand: Card[];

  // constructor() { }
  // addCard(){
  //   this.hand.push();
  // }
  // get score(){
  //   let sum = 0;
  //   let aceInHand = false;
  //   for (const card of who.hand) {
  //     if (card.value === 'ACE') {
  //       aceInHand = true;
  //     }
  //     sum += card.numValue;
  //   }
  //   if (sum <= 21 && aceInHand) {
  //     if (sum + 10 <= 21) {
  //       sum += 10;
  //     }
  //   }
  //   if (sum === 21){
  //     who.naturalBlackJack = true;
  //   }
  //   return sum;
  // }
}
