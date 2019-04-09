import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesContainerComponent } from './styles-container.component';

describe('StylesContainerComponent', () => {
  let component: StylesContainerComponent;
  let fixture: ComponentFixture<StylesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
