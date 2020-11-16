import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageTitleProviderComponent } from './page-title-provider.component';

describe('PageTitleProviderComponent', () => {
  let component: PageTitleProviderComponent;
  let fixture: ComponentFixture<PageTitleProviderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTitleProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTitleProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
