import { TestBed } from '@angular/core/testing';

import { GameEditorDataService } from './game-editor.data.service';

describe('GameEditorDataService', () => {
  let service: GameEditorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameEditorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
