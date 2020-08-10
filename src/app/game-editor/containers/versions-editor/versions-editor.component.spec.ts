import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsEditorComponent } from './versions-editor.component';

describe('VersionsEditorComponent', () => {
  let component: VersionsEditorComponent;
  let fixture: ComponentFixture<VersionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
