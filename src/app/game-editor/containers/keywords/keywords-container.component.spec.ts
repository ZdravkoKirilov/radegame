import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsContainerComponent } from './keywords-container.component';

describe('KeywordsContainerComponent', () => {
  let component: KeywordsContainerComponent;
  let fixture: ComponentFixture<KeywordsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
