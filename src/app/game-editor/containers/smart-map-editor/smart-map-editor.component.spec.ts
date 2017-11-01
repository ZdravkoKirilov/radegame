import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartMapEditorComponent } from './smart-map-editor.component';

describe('SmartMapEditorComponent', () => {
  let component: SmartMapEditorComponent;
  let fixture: ComponentFixture<SmartMapEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartMapEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartMapEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
