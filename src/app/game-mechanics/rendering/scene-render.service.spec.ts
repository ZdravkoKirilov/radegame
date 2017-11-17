import { TestBed, inject } from '@angular/core/testing';

import { SceneRenderService } from './scene-render.service';

describe('SceneRenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SceneRenderService]
    });
  });

  it('should be created', inject([SceneRenderService], (service: SceneRenderService) => {
    expect(service).toBeTruthy();
  }));
});
