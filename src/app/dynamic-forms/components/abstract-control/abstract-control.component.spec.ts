import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractControlComponent } from './abstract-control.component';

describe('AbstractControlComponent', () => {
  let component: AbstractControlComponent;
  let fixture: ComponentFixture<AbstractControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
