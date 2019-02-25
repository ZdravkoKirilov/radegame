import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDetailsPageComponent } from './setup-details-page.component';

describe('SetupDetailsPageComponent', () => {
  let component: SetupDetailsPageComponent;
  let fixture: ComponentFixture<SetupDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
