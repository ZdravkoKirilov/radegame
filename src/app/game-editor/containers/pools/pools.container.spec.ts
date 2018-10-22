import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolsContainerComponent } from './pools.container';

describe('EffectGroupsComponent', () => {
  let component: PoolsContainerComponent;
  let fixture: ComponentFixture<PoolsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
