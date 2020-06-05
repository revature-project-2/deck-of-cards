import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackjackComponent } from './blackjack.component';
import { LoginComponent } from '../../components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { CardComponent } from '../card/card.component';
import { GameComponent } from '../game/game.component';
import { MenuComponent } from '../menu/menu.component';
import { MygamesComponent } from '../mygames/mygames.component';
import { RegisterComponent } from '../register/register.component';

describe('BlackjackComponent', () => {
  let component: BlackjackComponent;
  let fixture: ComponentFixture<BlackjackComponent>;

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
    fixture = TestBed.createComponent(BlackjackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
