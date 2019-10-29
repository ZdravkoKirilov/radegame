import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedDataComponent } from './embedded-data.component';

describe('EmbeddedDataComponent', () => {
  let component: EmbeddedDataComponent;
  let fixture: ComponentFixture<EmbeddedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbeddedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
