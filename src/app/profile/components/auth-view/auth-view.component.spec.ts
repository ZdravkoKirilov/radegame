import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthViewComponent } from './auth-view.component';

describe('AuthViewComponent', () => {
  let component: AuthViewComponent;
  let fixture: ComponentFixture<AuthViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
