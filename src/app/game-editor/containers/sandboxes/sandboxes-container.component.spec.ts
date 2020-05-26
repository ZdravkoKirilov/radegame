import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxesContainerComponent } from './sandboxes-container.component';

describe('SandboxesContainerComponent', () => {
  let component: SandboxesContainerComponent;
  let fixture: ComponentFixture<SandboxesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
