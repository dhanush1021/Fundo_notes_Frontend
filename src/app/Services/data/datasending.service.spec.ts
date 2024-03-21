import { TestBed } from '@angular/core/testing';

import { DatasendingService } from './datasending.service';

describe('DatasendingService', () => {
  let service: DatasendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
