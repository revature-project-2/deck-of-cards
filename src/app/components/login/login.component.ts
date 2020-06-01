import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() logIn: EventEmitter<any> = new EventEmitter();
  loggedUser: User;
  username: string;
  password: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
    // check if anyone is already logged in
    this.authenticationService.login(null, null).subscribe(
      resp => {
        this.loggedUser = resp;
      }
    );
  }

  onClick() {
    this.authenticationService.login(this.username, this.password).subscribe(
      resp => {
        this.loggedUser = resp;
        this.logIn.emit(null);
        this.router.navigate(['home']);
      }
    );
  }

}
