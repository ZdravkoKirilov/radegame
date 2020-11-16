import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestBoardPresentationComponent } from './test-board-presentation.component';

describe('TestBoardPresentationComponent', () => {
  let component: TestBoardPresentationComponent;
  let fixture: ComponentFixture<TestBoardPresentationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBoardPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBoardPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
