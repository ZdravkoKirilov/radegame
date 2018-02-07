import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTriviaComponent } from './smart-trivia.component';

describe('SmartTriviaComponent', () => {
  let component: SmartTriviaComponent;
  let fixture: ComponentFixture<SmartTriviaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTriviaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
