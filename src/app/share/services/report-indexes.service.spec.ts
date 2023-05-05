import { TestBed } from '@angular/core/testing';

import { ReportIndexesService } from './report-indexes.service';

describe('ReportIndexesService', () => {
  let service: ReportIndexesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportIndexesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
