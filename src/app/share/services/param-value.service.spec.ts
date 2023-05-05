import { TestBed } from '@angular/core/testing';

import { ParamValueService } from './param-value.service';

describe('ParamValueService', () => {
  let service: ParamValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
