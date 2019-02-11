import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSidebarLinkComponent } from './edit-sidebar-link.component';

describe('EditSidebarLinkComponent', () => {
  let component: EditSidebarLinkComponent;
  let fixture: ComponentFixture<EditSidebarLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSidebarLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSidebarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
