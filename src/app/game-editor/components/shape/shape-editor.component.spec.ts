import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeEditorComponent } from './shape-editor.component';

describe('ShapeEditorComponent', () => {
  let component: ShapeEditorComponent;
  let fixture: ComponentFixture<ShapeEditorComponent>;

  beforeEach(async(() => {
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
