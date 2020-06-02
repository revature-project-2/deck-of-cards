import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  create(firstname, lastname, username, password)  {
    console.log('Creating User');
    return this.http.post<any>(`${environment.appUrl}/login/register`, {firstname, lastname, username, password, balance: 10050.0}, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(map(result => {
        console.log(result);
        return result;
      }));
  }
}
