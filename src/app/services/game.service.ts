import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Deck} from '../models/deck';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  // TODO add more game functionality
  newGame(): Observable<Deck> {
    return this.http.get<any>(`${environment.apiURL}/new/shuffle`)
      .pipe(map(result => {
        return result as Deck;
      }));
  }

  shuffle(id: number): Observable<Deck> {
    return this.http.get<any>(`${environment.appUrl}/${id}/shuffle/`)
      .pipe(map(result => {
        console.log(result);
        return result;
      }));
  }

  draw(id: number, count: number): Observable<Deck> {
    return this.http.get<any>(`${environment.appUrl}/${id}/draw/?count=${count}`)
      .pipe(map(result => {
        console.log(result);
        return result;
      }));
  }


}
