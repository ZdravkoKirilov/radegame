import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTriviaEditorComponent } from './smart-trivia-editor.component';

describe('SmartTriviaEditorComponent', () => {
  let component: SmartTriviaEditorComponent;
  let fixture: ComponentFixture<SmartTriviaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTriviaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTriviaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
