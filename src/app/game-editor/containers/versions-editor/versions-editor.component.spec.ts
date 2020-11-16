import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VersionsEditorComponent } from './versions-editor.component';

describe('VersionsEditorComponent', () => {
  let component: VersionsEditorComponent;
  let fixture: ComponentFixture<VersionsEditorComponent>;

  beforeEach(waitForAsync(() => {
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
