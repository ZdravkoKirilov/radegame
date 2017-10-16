import { TestBed, inject } from '@angular/core/testing';

import { GameResourcesService } from './game-resources.service';

describe('GameResourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameResourcesService]
    });
  });

  it('should be created', inject([GameResourcesService], (service: GameResourcesService) => {
    expect(service).toBeTruthy();
  }));
});
