import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionsContainerComponent } from './expressions-container.component';

describe('ExpressionsContainerComponent', () => {
  let component: ExpressionsContainerComponent;
  let fixture: ComponentFixture<ExpressionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
