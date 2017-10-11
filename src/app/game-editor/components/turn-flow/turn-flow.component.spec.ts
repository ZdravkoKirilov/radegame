import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnTemplateComponent } from './turn-flow.component';

describe('TurnTemplateComponent', () => {
  let component: TurnTemplateComponent;
  let fixture: ComponentFixture<TurnTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
