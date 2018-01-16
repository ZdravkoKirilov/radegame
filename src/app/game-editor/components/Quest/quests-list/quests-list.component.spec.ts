import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestsListComponent } from './quests-list.component';

describe('QuestsListComponent', () => {
  let component: QuestsListComponent;
  let fixture: ComponentFixture<QuestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
