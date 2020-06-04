import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
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

  // TODO add more game functionality
  newGame(): Observable<Deck> {
    return this.http.get<any>(`${environment.apiURL}/new/shuffle`)
      .pipe(map(result =>{
        this.gameId = result.deck_id;
        return result as Deck;
        })
      );
  }

  shuffle(id: number): Observable<Deck> {
    return this.http.get<any>(`${environment.apiURL}/${id}/shuffle/`)
      .pipe(map(result => result))
  }

  draw(id: string, count: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/${id}/draw/?count=${count}`)
      .pipe(map(result => {
        let cardArray = [];
        for (let card of result.cards) {
          let newCard = new Card(card.image, card.value, card.suit, card.code);
          cardArray.push(newCard);
        }
        return cardArray;
      }));
  }

}
