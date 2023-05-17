import { TestBed } from '@angular/core/testing';

import { DetailReportIndexService } from './detail-report-index.service';

describe('DetailReportIndexService', () => {
  let service: DetailReportIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailReportIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
