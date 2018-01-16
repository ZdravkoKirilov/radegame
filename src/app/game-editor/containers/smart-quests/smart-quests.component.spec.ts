import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartQuestsComponent } from './smart-quests.component';

describe('SmartQuestsComponent', () => {
  let component: SmartQuestsComponent;
  let fixture: ComponentFixture<SmartQuestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartQuestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartQuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
