import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardListComponent } from './game-board-list.component';

describe('GameBoardListComponent', () => {
  let component: GameBoardListComponent;
  let fixture: ComponentFixture<GameBoardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBoardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
