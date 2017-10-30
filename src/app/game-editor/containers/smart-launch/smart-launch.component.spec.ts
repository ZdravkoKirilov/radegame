import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLaunchComponent } from './smart-launch.component';

describe('SmartLaunchComponent', () => {
  let component: SmartLaunchComponent;
  let fixture: ComponentFixture<SmartLaunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
