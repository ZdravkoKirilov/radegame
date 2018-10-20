import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactionsContainerComponent } from './factions.container';

describe('SmartFactionsComponent', () => {
  let component: FactionsContainerComponent;
  let fixture: ComponentFixture<FactionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
