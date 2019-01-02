import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAssetContainerComponent } from './image-asset-container.component';

describe('ImageAssetContainerComponent', () => {
  let component: ImageAssetContainerComponent;
  let fixture: ComponentFixture<ImageAssetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageAssetContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAssetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
