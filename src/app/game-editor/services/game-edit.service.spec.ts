import { TestBed, inject } from '@angular/core/testing';

import { GameEditService } from './game-edit.service';

describe('GameEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameEditService]
    });
  });

  it('should be created', inject([GameEditService], (service: GameEditService) => {
    expect(service).toBeTruthy();
  }));
});
