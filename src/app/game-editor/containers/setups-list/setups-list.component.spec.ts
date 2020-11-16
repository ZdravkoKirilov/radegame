import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SetupsListComponent } from './setups-list.component';

describe('SetupsListComponent', () => {
  let component: SetupsListComponent;
  let fixture: ComponentFixture<SetupsListComponent>;

  beforeEach(waitForAsync(() => {
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
