import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username, password) {
    console.log(`${environment.appUrl}/login`);

    return this.http.post<any>(`${environment.appUrl}/login`, {username, password})
      .pipe(map(result => {
        // console.log(result);
        return result;
      }));
  }

  logout() {
    this.http.delete(`${environment.appUrl}/login`).subscribe(data => {
    });
    console.log('User logged out.');
  }
}
