import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { BlackjackComponent } from '../blackjack/blackjack.component';
import { CardComponent } from '../card/card.component';
import { GameComponent } from '../game/game.component';
import { MenuComponent } from '../menu/menu.component';
import { MygamesComponent } from '../mygames/mygames.component';
import { RegisterComponent } from '../register/register.component';
import {AuthenticationService} from '../../services/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, FormsModule, AppRoutingModule],
      // tslint:disable-next-line: max-line-length
      declarations: [ LoginComponent, BlackjackComponent, CardComponent, GameComponent, MenuComponent, MygamesComponent, RegisterComponent ],
      providers: [AuthenticationService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('should log in with correct input', () => {
    component.username = 'snichols';
    component.password = 'pass';

    component.onClick();
    expect(component.username).toEqual('snichols');
    console.log(component.username);
    expect(localStorage.getItem('currentUser')).toBeTruthy();
    console.log(localStorage.getItem('currentUser'));
  });
});
