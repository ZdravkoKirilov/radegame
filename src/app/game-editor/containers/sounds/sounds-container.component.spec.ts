import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundsContainerComponent } from './sounds-container.component';

describe('SoundsContainerComponent', () => {
  let component: SoundsContainerComponent;
  let fixture: ComponentFixture<SoundsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
