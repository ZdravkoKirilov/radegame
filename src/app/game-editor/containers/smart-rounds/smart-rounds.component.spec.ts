import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartRoundsComponent } from './smart-rounds.component';

describe('SmartRoundsComponent', () => {
  let component: SmartRoundsComponent;
  let fixture: ComponentFixture<SmartRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartRoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
