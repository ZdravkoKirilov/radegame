import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsContainerComponent } from './conditions.container';

describe('SmartQuestsComponent', () => {
  let component: ConditionsContainerComponent;
  let fixture: ComponentFixture<ConditionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
