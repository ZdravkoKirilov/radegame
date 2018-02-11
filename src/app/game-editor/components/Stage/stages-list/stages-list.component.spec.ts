import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesListComponent } from './stages-list.component';

describe('StagesListComponent', () => {
  let component: StagesListComponent;
  let fixture: ComponentFixture<StagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
