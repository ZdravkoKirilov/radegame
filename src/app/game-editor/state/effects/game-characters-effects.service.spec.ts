import { TestBed, inject } from '@angular/core/testing';

import { GameCharactersEffectsService } from './game-characters-effects.service';

describe('GameCharactersEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameCharactersEffectsService]
    });
  });

  it('should be created', inject([GameCharactersEffectsService], (service: GameCharactersEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
