import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2} from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// export class LoginComponent implements OnInit, AfterViewInit {
  @Output() logIn: EventEmitter<any> = new EventEmitter();
  loggedUser: User;
  username: string;
  password: string;
  deckId: string;

  // tslint:disable-next-line: max-line-length
  constructor(private authenticationService: AuthenticationService, private router: Router, private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.username = '';
    this.password = '';
    // check if anyone is already logged in
    // this.authenticationService.login(null, null).subscribe(
    //   resp => {
    //     this.loggedUser = resp;
    //   }
    // );
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['menu']);
    }
    // this.bjService.newGame().subscribe(res => this.deckId = res.deck_id);
  }

  //  ngAfterViewInit(){
  //    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'backgroundColor', '#343a40');
  // }

  onClick() {
    this.authenticationService.login(this.username, this.password).subscribe(
      resp => {
        this.loggedUser = resp;
        this.logIn.emit(null);
        this.router.navigate(['menu']);
      }
    );
  }
}
