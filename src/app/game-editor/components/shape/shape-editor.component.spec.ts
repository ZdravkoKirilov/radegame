import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShapeEditorComponent } from './shape-editor.component';

describe('ShapeEditorComponent', () => {
  let component: ShapeEditorComponent;
  let fixture: ComponentFixture<ShapeEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
