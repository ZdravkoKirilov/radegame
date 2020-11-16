import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShapePreviewComponent } from './shape-preview.component';

describe('ShapePreviewComponent', () => {
  let component: ShapePreviewComponent;
  let fixture: ComponentFixture<ShapePreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
