import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentsContainerComponent } from './experiments-container.component';

describe('ExperimentsContainerComponent', () => {
  let component: ExperimentsContainerComponent;
  let fixture: ComponentFixture<ExperimentsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
