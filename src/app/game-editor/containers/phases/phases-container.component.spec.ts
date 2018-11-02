import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesContainerComponent } from './phases-container.component';

describe('PhasesContainerComponent', () => {
  let component: PhasesContainerComponent;
  let fixture: ComponentFixture<PhasesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
