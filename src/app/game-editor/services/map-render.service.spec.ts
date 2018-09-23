import { TestBed, inject } from '@angular/core/testing';

import { MapRenderService } from './map-render.service';

describe('SceneRenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapRenderService]
    });
  });

  it('should be created', inject([MapRenderService], (service: MapRenderService) => {
    expect(service).toBeTruthy();
  }));
});
