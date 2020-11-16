import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameMenuLoaderComponent } from './game-menu-loader.component';

describe('GameMenuLoaderComponent', () => {
  let component: GameMenuLoaderComponent;
  let fixture: ComponentFixture<GameMenuLoaderComponent>;

  beforeEach(waitForAsync(() => {
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
