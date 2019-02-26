import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLobbiesComponent } from './game-lobbies.component';

describe('GameLobbiesComponent', () => {
  let component: GameLobbiesComponent;
  let fixture: ComponentFixture<GameLobbiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLobbiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLobbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
