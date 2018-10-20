import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundsContainerComponent } from './rounds.container';

describe('SmartRoundsComponent', () => {
  let component: RoundsContainerComponent;
  let fixture: ComponentFixture<RoundsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
