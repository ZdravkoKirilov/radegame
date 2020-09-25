import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBoardContainerComponent } from './test-board-container.component';

describe('TestBoardContainerComponent', () => {
  let component: TestBoardContainerComponent;
  let fixture: ComponentFixture<TestBoardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBoardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBoardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
