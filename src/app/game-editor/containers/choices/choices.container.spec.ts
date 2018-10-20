import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesContainerComponent } from './choices.container';

describe('SmartTriviaComponent', () => {
  let component: ChoicesContainerComponent;
  let fixture: ComponentFixture<ChoicesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
