import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcesContainerComponent } from './sources-container.component';

describe('SourcesContainerComponent', () => {
  let component: SourcesContainerComponent;
  let fixture: ComponentFixture<SourcesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
