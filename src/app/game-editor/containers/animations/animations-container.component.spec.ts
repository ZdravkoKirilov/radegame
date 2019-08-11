import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationsContainerComponent } from './animations-container.component';

describe('AnimationsContainerComponent', () => {
  let component: AnimationsContainerComponent;
  let fixture: ComponentFixture<AnimationsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
