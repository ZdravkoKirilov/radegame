import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectStacksComponent } from './effect-stacks.component';

describe('EffectStacksComponent', () => {
  let component: EffectStacksComponent;
  let fixture: ComponentFixture<EffectStacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectStacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectStacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
