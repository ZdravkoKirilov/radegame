import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBoardPresentationComponent } from './test-board-presentation.component';

describe('TestBoardPresentationComponent', () => {
  let component: TestBoardPresentationComponent;
  let fixture: ComponentFixture<TestBoardPresentationComponent>;

  beforeEach(async(() => {
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
