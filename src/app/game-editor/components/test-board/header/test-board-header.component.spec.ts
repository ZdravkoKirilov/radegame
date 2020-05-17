import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBoardHeaderComponent } from './test-board-header.component';

describe('TestBoardHeaderComponent', () => {
  let component: TestBoardHeaderComponent;
  let fixture: ComponentFixture<TestBoardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBoardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBoardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
