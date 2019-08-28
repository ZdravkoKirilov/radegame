import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveGamesProviderComponent } from './active-games-provider.component';

describe('ActiveGamesProviderComponent', () => {
  let component: ActiveGamesProviderComponent;
  let fixture: ComponentFixture<ActiveGamesProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveGamesProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveGamesProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
