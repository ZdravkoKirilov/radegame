import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaBoardComponent } from './trivia-board.component';

describe('TriviaBoardComponent', () => {
  let component: TriviaBoardComponent;
  let fixture: ComponentFixture<TriviaBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriviaBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
