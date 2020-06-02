import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Game} from '../models/game';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private urlService: UrlService, private http: HttpClient) {
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post(`${environment.appUrl}/${game}`, {withCredentials: true}).pipe(
      map(resp => resp as Game)
    );
  }

  //
  // updateCat(game: Game): Observable<object> {
  //   return this.http.put(this.urlService.getUrl() + 'game/' + game.id, game, {withCredentials: true}).pipe();
  // }
  //
  // deleteCat(game: Game): Observable<object> {
  //   return this.http.delete(this.urlService.getUrl() + 'game/' + game.id).pipe();
  // }
}
