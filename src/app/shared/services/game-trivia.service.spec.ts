import { TestBed, inject } from '@angular/core/testing';

import { GameTriviaService } from './game-trivia.service';

describe('GameTriviaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameTriviaService]
    });
  });

  it('should be created', inject([GameTriviaService], (service: GameTriviaService) => {
    expect(service).toBeTruthy();
  }));
});
