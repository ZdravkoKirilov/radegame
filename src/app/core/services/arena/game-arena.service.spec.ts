import { TestBed } from '@angular/core/testing';

import { GameArenaService } from './game-arena.service';

describe('GameArenaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameArenaService = TestBed.get(GameArenaService);
    expect(service).toBeTruthy();
  });
});
