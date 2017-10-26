import { TestBed, inject } from '@angular/core/testing';

import { BoardFieldsService } from './board-fields.service';

describe('BoardFieldsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardFieldsService]
    });
  });

  it('should be created', inject([BoardFieldsService], (service: BoardFieldsService) => {
    expect(service).toBeTruthy();
  }));
});
