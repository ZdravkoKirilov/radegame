import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FacebookSignInComponent } from './facebook-sign-in.component';

describe('FacebookSignInComponent', () => {
  let component: FacebookSignInComponent;
  let fixture: ComponentFixture<FacebookSignInComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
