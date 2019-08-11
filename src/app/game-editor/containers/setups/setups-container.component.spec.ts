import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupsContainerComponent } from './setups-container.component';

describe('SetupsContainerComponent', () => {
  let component: SetupsContainerComponent;
  let fixture: ComponentFixture<SetupsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
