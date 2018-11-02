import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensContainerComponent } from './tokens-container.component';

describe('TokensContainerComponent', () => {
  let component: TokensContainerComponent;
  let fixture: ComponentFixture<TokensContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokensContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokensContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
