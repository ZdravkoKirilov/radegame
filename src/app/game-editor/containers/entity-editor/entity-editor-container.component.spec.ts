import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityEditorContainerComponent } from './entity-editor-container.component';

describe('EntityEditorContainerComponent', () => {
  let component: EntityEditorContainerComponent;
  let fixture: ComponentFixture<EntityEditorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityEditorContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEditorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
