import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestBoardHeaderComponent } from './test-board-header.component';

describe('TestBoardHeaderComponent', () => {
  let component: TestBoardHeaderComponent;
  let fixture: ComponentFixture<TestBoardHeaderComponent>;

  beforeEach(waitForAsync(() => {
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
