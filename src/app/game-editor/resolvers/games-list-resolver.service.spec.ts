import { TestBed, inject } from '@angular/core/testing';

import { GamesListResolverService } from './games-list-resolver.service';

describe('GamesListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamesListResolverService]
    });
  });

  it('should be created', inject([GamesListResolverService], (service: GamesListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
