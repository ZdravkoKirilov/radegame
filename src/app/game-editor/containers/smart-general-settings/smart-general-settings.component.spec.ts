import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartGeneralSettingsComponent } from './smart-general-settings.component';

describe('SmartGeneralSettingsComponent', () => {
  let component: SmartGeneralSettingsComponent;
  let fixture: ComponentFixture<SmartGeneralSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartGeneralSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartGeneralSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
