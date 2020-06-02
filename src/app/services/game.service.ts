import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/game';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  // TODO add more game functionality
  addGame(game: Game): Observable<Game> {
    return this.http.post(`${environment.appUrl}/${game}`, {withCredentials: true}).pipe(
      map( resp => resp as Game)
    );
  }

//  updateGame(game: Game): Observable<object> {
//    return this.http.put(`${environment.appUrl}/game/` + game.id, game, {withCredentials: true}).pipe();
//  }

//  deleteGame(game: Game): Observable<object> {
//    return this.http.delete(`${environment.appUrl}/game/` + game.id).pipe();
//  }

}
