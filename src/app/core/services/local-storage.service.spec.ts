import { TestBed, inject } from '@angular/core/testing';

import { AppLocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppLocalStorageService]
    });
  });

  it('should be created', inject([AppLocalStorageService], (service: AppLocalStorageService) => {
    expect(service).toBeTruthy();
  }));
});
