import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditorSidebarLayoutComponent } from './editor-sidebar-layout.component';

describe('EditorSidebarLayoutComponent', () => {
  let component: EditorLayoutComponent;
  let fixture: ComponentFixture<EditorLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
