import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActiveGamesProviderComponent } from './active-games-provider.component';

describe('ActiveGamesProviderComponent', () => {
  let component: ActiveGamesProviderComponent;
  let fixture: ComponentFixture<ActiveGamesProviderComponent>;

  beforeEach(waitForAsync(() => {
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
