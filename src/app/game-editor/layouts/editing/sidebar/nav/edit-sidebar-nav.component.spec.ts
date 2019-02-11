import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSidebarNavComponent } from './edit-sidebar-nav.component';

describe('EditSidebarNavComponent', () => {
  let component: EditSidebarNavComponent;
  let fixture: ComponentFixture<EditSidebarNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSidebarNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSidebarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
