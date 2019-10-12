import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextsContainerComponent } from './texts-container.component';

describe('TextsContainerComponent', () => {
  let component: TextsContainerComponent;
  let fixture: ComponentFixture<TextsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
