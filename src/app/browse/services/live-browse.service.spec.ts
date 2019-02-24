import { TestBed } from '@angular/core/testing';

import { LiveBrowseService } from './live-browse.service';

describe('LiveBrowseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveBrowseService = TestBed.get(LiveBrowseService);
    expect(service).toBeTruthy();
  });
});
