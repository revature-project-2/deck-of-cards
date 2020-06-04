import { Game } from './game';
import { Card } from './card';

export class User {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  balance: number;
  games: Game[];
  handValue:number;
  bust:boolean;
  blackJack:boolean;
  naturalBlackJack:boolean;
  cards: Card[];
}
