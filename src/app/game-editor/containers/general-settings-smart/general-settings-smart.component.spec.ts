import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSettingsSmartComponent } from './general-settings-smart.component';

describe('GeneralSettingsSmartComponent', () => {
  let component: GeneralSettingsSmartComponent;
  let fixture: ComponentFixture<GeneralSettingsSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSettingsSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSettingsSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
