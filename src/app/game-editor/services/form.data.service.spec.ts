import { TestBed } from '@angular/core/testing';

import { FormDataService } from './form.data.service';

describe('Form.DataService', () => {
  let service: FormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
