import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMenuLoaderComponent } from './game-menu-loader.component';

describe('GameMenuLoaderComponent', () => {
  let component: GameMenuLoaderComponent;
  let fixture: ComponentFixture<GameMenuLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameMenuLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMenuLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
