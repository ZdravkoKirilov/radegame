import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSidebarHeaderComponent } from './edit-sidebar-header.component';

describe('EditSidebarHeaderComponent', () => {
  let component: EditSidebarHeaderComponent;
  let fixture: ComponentFixture<EditSidebarHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSidebarHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSidebarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
