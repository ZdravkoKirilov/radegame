import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactionEditorComponent } from './faction-editor.component';

describe('FactionEditorComponent', () => {
  let component: FactionEditorComponent;
  let fixture: ComponentFixture<FactionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
