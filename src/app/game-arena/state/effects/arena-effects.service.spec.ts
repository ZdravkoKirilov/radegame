import { TestBed } from '@angular/core/testing';

import { ArenaEffectsService } from './arena-effects.service';

describe('ArenaEffectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArenaEffectsService = TestBed.get(ArenaEffectsService);
    expect(service).toBeTruthy();
  });
});
