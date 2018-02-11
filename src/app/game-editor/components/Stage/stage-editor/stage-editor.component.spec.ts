import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageEditorComponent } from './stage-editor.component';

describe('StageEditorComponent', () => {
  let component: StageEditorComponent;
  let fixture: ComponentFixture<StageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
