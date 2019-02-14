import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseLayoutComponent } from './browse-layout.component';

describe('BrowseLayoutComponent', () => {
  let component: BrowseLayoutComponent;
  let fixture: ComponentFixture<BrowseLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
