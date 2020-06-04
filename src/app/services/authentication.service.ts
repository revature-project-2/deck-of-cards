import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

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


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    console.log(`${environment.appUrl}/login`);

    return this.http.post<any>(`${environment.appUrl}/login`, {username, password})
      .pipe(map(result => {
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.currentUserSubject.next(result);
        return result;
      }));
  }

  logout() {
    console.log('User logged out.');
    this.http.delete(`${environment.appUrl}/login`).subscribe(data => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    });
  }
}
