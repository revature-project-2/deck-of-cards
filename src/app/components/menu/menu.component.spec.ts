import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import { LoginComponent } from '../../components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { BlackjackComponent } from '../blackjack/blackjack.component';
import { GameComponent } from '../game/game.component';
import { MygamesComponent } from '../mygames/mygames.component';
import { RegisterComponent } from '../register/register.component';
import { CardComponent } from '../card/card.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, FormsModule, AppRoutingModule ],
      // tslint:disable-next-line: max-line-length
      declarations: [ LoginComponent, BlackjackComponent, CardComponent, GameComponent, MenuComponent, MygamesComponent, RegisterComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
