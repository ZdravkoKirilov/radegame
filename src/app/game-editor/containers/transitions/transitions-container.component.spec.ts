import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionsContainerComponent } from './transitions-container.component';

describe('TransitionsContainerComponent', () => {
  let component: TransitionsContainerComponent;
  let fixture: ComponentFixture<TransitionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
