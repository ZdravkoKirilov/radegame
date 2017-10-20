import { TestBed, inject } from '@angular/core/testing';

import { GameTriviaEffectsService } from './game-trivia-effects.service';

describe('GameTriviaEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameTriviaEffectsService]
    });
  });

  it('should be created', inject([GameTriviaEffectsService], (service: GameTriviaEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
