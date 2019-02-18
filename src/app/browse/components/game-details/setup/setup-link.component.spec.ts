import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupLinkComponent } from './setup-link.component';

describe('SetupLinkComponent', () => {
  let component: SetupLinkComponent;
  let fixture: ComponentFixture<SetupLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
