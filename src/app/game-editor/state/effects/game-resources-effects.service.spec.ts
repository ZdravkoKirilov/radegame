import { TestBed, inject } from '@angular/core/testing';

import { GameResourcesEffectsService } from './game-resources-effects.service';

describe('GameResourcesEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameResourcesEffectsService]
    });
  });

  it('should be created', inject([GameResourcesEffectsService], (service: GameResourcesEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
