import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesListPage } from './games-list.component';

describe('GamesListComponent', () => {
  let component: GamesListPage;
  let fixture: ComponentFixture<GamesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
