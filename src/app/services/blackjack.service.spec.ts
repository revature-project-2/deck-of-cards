import { TestBed } from '@angular/core/testing';

import { BlackjackService } from './blackjack.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BlackjackService', () => {
  let service: BlackjackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackjackService);
  });

  /*it('should be created', () => {
    expect(service).toBeTruthy();
  });*/
});
