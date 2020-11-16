import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameArenaRootComponent } from './game-arena-root.component';

describe('GameArenaRootComponent', () => {
  let component: GameArenaRootComponent;
  let fixture: ComponentFixture<GameArenaRootComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GameArenaRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameArenaRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
