import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyListItemComponent } from './lobby-list-item.component';

describe('LobbyListItemComponent', () => {
  let component: LobbyListItemComponent;
  let fixture: ComponentFixture<LobbyListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbyListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
