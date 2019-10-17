import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonatasContainerComponent } from './sonatas-container.component';

describe('SonatasContainerComponent', () => {
  let component: SonatasContainerComponent;
  let fixture: ComponentFixture<SonatasContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonatasContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonatasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
