import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCharactersComponent } from './smart-characters.component';

describe('SmartCharactersComponent', () => {
  let component: SmartCharactersComponent;
  let fixture: ComponentFixture<SmartCharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartCharactersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
