import { TestBed, inject } from '@angular/core/testing';

import { GameEditEffectsService } from './game-edit-effects.service';

describe('GameEditEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameEditEffectsService]
    });
  });

  it('should be created', inject([GameEditEffectsService], (service: GameEditEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
