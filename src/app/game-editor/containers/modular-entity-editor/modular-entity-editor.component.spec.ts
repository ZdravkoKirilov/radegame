import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModularEntityEditorComponent } from './modular-entity-editor.component';

describe('ModularEntityEditorComponent', () => {
  let component: ModularEntityEditorComponent;
  let fixture: ComponentFixture<ModularEntityEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModularEntityEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModularEntityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
