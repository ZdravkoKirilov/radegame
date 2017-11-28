import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFactionsComponent } from './smart-factions.component';

describe('SmartFactionsComponent', () => {
  let component: SmartFactionsComponent;
  let fixture: ComponentFixture<SmartFactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartFactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
