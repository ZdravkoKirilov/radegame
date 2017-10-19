import { TestBed, inject } from '@angular/core/testing';

import { GameCharactersService } from './game-characters.service';

describe('CharactersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameCharactersService]
    });
  });

  it('should be created', inject([GameCharactersService], (service: GameCharactersService) => {
    expect(service).toBeTruthy();
  }));
});
