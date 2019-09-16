import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEngineLoaderComponent } from './game-engine-loader.component';

describe('GameEngineLoaderComponent', () => {
  let component: GameEngineLoaderComponent;
  let fixture: ComponentFixture<GameEngineLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameEngineLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEngineLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
