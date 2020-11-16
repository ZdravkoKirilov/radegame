import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameLoaderComponent } from './game-loader.component';

describe('GameLoaderComponent', () => {
  let component: GameLoaderComponent;
  let fixture: ComponentFixture<GameLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
