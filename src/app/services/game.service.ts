import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Deck} from '../models/deck';
import {Card} from '../models/card';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameId: string;
  constructor(private http: HttpClient) {
  }
  getGameId() {
    return this.gameId;
  }
  // TODO add more game functionality
  newGame(): Observable<Deck> {
    console.log("newGame in game service");
    return this.http.get<any>(`${environment.apiURL}/new/shuffle`)
      .pipe(map(result => {
          this.gameId = result.deck_id;
          console.log(result.deck_id);
          return result as Deck;
        })
      );
  }

  shuffle(id: number): Observable<Deck> {
    return this.http.get<any>(`${environment.apiURL}/${id}/shuffle/`)
      .pipe(map(result => result));
  }

  draw(id: string, count: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/${this.gameId}/draw/?count=${count}`)
      .pipe(map(result => {
        const cardArray = [];
        for (const card of result.cards) {
          const newCard = new Card(card.image, card.value, card.suit, card.code);
          cardArray.push(newCard);
        }
        return cardArray;
      }));
  }

  save() {
    this.newGame();
    return this.http.post<any>(`${environment.appUrl}/game`, {deckId: this.gameId, type: 1, score: 0, amountWon: 0}, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
      .pipe(map(resp => {
        console.log(resp);
        return resp;
      }));
  }

}
