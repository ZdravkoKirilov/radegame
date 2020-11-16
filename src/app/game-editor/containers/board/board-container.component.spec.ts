import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BoardContainerComponent } from './board-container.component';

describe('BoardContainerComponent', () => {
  let component: BoardContainerComponent;
  let fixture: ComponentFixture<BoardContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
