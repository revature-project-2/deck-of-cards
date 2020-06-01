import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  login(username, password) {
    console.log(`${environment.appUrl}/login`);

    return this.http.post<any>(`${environment.appUrl}/login`, {username, password})
      .pipe(map(result => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(result[`player`]));
        this.currentUserSubject.next(result[`player`]);
        console.log(result);
        return result;
      }));
  }

  logoutUser() {
    this.http.delete(`${environment.appUrl}/login`).subscribe(data => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    });
    console.log('User logged out.');
  }
  
}
