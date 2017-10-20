import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviasListComponent } from './trivias-list.component';

describe('TriviasListComponent', () => {
  let component: TriviasListComponent;
  let fixture: ComponentFixture<TriviasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriviasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
