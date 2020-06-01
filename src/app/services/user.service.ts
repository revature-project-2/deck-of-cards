import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  create(firstname, lastname, username, password) {
    return this.http.put<any>(`${environment.apiUrl}/login`, {firstname, lastname, username, password})
      .pipe(map(result => {
        return result;
      }));
  }
}
