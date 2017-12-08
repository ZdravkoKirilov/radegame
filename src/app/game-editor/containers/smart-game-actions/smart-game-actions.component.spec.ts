import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartGameActionsComponent } from './smart-game-actions.component';

describe('SmartGameActionsComponent', () => {
  let component: SmartGameActionsComponent;
  let fixture: ComponentFixture<SmartGameActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartGameActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartGameActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
