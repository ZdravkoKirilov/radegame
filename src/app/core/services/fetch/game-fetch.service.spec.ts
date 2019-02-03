import { TestBed } from '@angular/core/testing';

import { GameFetchService } from './game-fetch.service';

describe('GameFetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameFetchService = TestBed.get(GameFetchService);
    expect(service).toBeTruthy();
  });
});
