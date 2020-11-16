import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameMenuRootComponent } from './game-menu-root.component';

describe('GameMenuRootComponent', () => {
  let component: GameMenuRootComponent;
  let fixture: ComponentFixture<GameMenuRootComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GameMenuRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMenuRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
