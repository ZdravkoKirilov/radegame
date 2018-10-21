import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectGroupsComponent } from './effect-groups.component';

describe('EffectGroupsComponent', () => {
  let component: EffectGroupsComponent;
  let fixture: ComponentFixture<EffectGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
