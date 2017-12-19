import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameActionEditorComponent } from './activity-editor.component';

describe('GameActionEditorComponent', () => {
  let component: GameActionEditorComponent;
  let fixture: ComponentFixture<GameActionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameActionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameActionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
