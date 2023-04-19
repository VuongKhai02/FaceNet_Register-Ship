import { TestBed } from '@angular/core/testing';

import { Tm1Service } from './tm1.service';

describe('Tm1Service', () => {
  let service: Tm1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tm1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
