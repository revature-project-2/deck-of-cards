import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BlackjackComponent} from './mygames.component';

describe('MygamesComponent', () => {
  let component: BlackjackComponent;
  let fixture: ComponentFixture<BlackjackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlackjackComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackjackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
