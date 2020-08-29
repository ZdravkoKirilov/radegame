import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootEntityEditorComponent } from './root-entity-editor.component';

describe('RootEntityEditorComponent', () => {
  let component: RootEntityEditorComponent;
  let fixture: ComponentFixture<RootEntityEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootEntityEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootEntityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
