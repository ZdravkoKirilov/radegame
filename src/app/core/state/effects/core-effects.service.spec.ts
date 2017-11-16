import { TestBed, inject } from '@angular/core/testing';

import { CoreEffectsService } from './core-effects.service';

describe('CoreEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoreEffectsService]
    });
  });

  it('should be created', inject([CoreEffectsService], (service: CoreEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
