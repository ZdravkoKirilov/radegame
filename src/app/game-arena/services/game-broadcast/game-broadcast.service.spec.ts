import { TestBed } from '@angular/core/testing';

import { GameBroadcastService } from './game-broadcast.service';

describe('GameBroadcastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameBroadcastService = TestBed.get(GameBroadcastService);
    expect(service).toBeTruthy();
  });
});
