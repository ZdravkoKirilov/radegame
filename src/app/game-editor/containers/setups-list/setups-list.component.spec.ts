import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupsListComponent } from './setups-list.component';

describe('SetupsListComponent', () => {
  let component: SetupsListComponent;
  let fixture: ComponentFixture<SetupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
