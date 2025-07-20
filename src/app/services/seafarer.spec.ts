import { TestBed } from '@angular/core/testing';

import { Seafarer } from './seafarer';

describe('Seafarer', () => {
  let service: Seafarer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Seafarer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
