import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameActionsListComponent } from './game-actions-list.component';

describe('GameActionsListComponent', () => {
  let component: GameActionsListComponent;
  let fixture: ComponentFixture<GameActionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameActionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
