import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPathComponent } from './map-path.component';

describe('MapPathComponent', () => {
  let component: MapPathComponent;
  let fixture: ComponentFixture<MapPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
