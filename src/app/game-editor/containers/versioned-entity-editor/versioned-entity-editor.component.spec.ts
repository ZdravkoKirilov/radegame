import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionedEntityEditorComponent } from './versioned-entity-editor.component';

describe('VersionedEntityEditorComponent', () => {
  let component: VersionedEntityEditorComponent;
  let fixture: ComponentFixture<VersionedEntityEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionedEntityEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionedEntityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
