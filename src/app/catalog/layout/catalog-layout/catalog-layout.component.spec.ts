import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogLayoutComponent } from './catalog-layout.component';

describe('BrowseLayoutComponent', () => {
  let component: CatalogLayoutComponent;
  let fixture: ComponentFixture<CatalogLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
