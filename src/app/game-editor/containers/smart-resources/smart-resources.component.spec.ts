import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartResourcesComponent } from './smart-resources.component';

describe('SmartResourcesComponent', () => {
  let component: SmartResourcesComponent;
  let fixture: ComponentFixture<SmartResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
