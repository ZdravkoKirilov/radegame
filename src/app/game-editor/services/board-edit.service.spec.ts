import { TestBed } from '@angular/core/testing';

import { BoardEditService } from './board-edit.service';

describe('BoardEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardEditService = TestBed.get(BoardEditService);
    expect(service).toBeTruthy();
  });
});
