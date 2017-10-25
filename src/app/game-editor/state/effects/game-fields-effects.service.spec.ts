import { TestBed, inject } from '@angular/core/testing';

import { GameFieldsEffectsService } from './game-fields-effects.service';

describe('GameFieldsEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameFieldsEffectsService]
    });
  });

  it('should be created', inject([GameFieldsEffectsService], (service: GameFieldsEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
