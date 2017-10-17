import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartResourceEditorComponent } from './smart-resource-editor.component';

describe('SmartResourceEditorComponent', () => {
  let component: SmartResourceEditorComponent;
  let fixture: ComponentFixture<SmartResourceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartResourceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartResourceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
