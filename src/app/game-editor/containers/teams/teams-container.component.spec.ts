import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsContainerComponent } from './teams-container.component';

describe('TeamsContainerComponent', () => {
  let component: TeamsContainerComponent;
  let fixture: ComponentFixture<TeamsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
