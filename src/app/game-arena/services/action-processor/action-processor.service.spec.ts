import { TestBed } from '@angular/core/testing';

import { ActionProcessorService } from './action-processor.service';

describe('ActionProcessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionProcessorService = TestBed.get(ActionProcessorService);
    expect(service).toBeTruthy();
  });
});
