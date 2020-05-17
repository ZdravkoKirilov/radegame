import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBoardStateComponent } from './test-board-state.component';

describe('TestBoardStateComponent', () => {
  let component: TestBoardStateComponent;
  let fixture: ComponentFixture<TestBoardStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBoardStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBoardStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
