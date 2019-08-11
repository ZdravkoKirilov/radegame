import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlersContainerComponent } from './handlers-container.component';

describe('HandlersContainerComponent', () => {
  let component: HandlersContainerComponent;
  let fixture: ComponentFixture<HandlersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandlersContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
