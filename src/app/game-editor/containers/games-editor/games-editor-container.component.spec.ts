import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GamesEditorContainerComponent } from './games-editor-container.component';

describe('GamesEditorContainerComponent', () => {
  let component: GamesEditorContainerComponent;
  let fixture: ComponentFixture<GamesEditorContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesEditorContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesEditorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
