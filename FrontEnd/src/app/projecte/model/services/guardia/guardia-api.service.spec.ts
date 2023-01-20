import { TestBed } from '@angular/core/testing';

import { GuardiaApiService } from './guardia-api.service';

describe('GuardiaApiService', () => {
  let service: GuardiaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardiaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
