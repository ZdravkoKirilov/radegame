import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntityEditorComponent } from './entity-editor.component';

describe('EntityEditorComponent', () => {
  let component: EntityEditorComponent;
  let fixture: ComponentFixture<EntityEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
