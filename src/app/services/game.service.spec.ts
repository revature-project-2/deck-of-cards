import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  /*it('should be created', () => {
    expect(service).toBeTruthy();
  });*/
});
