import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesContainerComponent } from './states-container.component';

describe('StatesContainerComponent', () => {
  let component: StatesContainerComponent;
  let fixture: ComponentFixture<StatesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
