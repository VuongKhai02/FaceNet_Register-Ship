import { TestBed } from '@angular/core/testing';

import { FormTm1Service } from './form-tm1.service';

describe('FormTm1Service', () => {
  let service: FormTm1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormTm1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
