import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaEditorComponent } from './trivia-editor.component';

describe('TriviaEditorComponent', () => {
  let component: TriviaEditorComponent;
  let fixture: ComponentFixture<TriviaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriviaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
