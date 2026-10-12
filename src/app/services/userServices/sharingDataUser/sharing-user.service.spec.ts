import { TestBed } from '@angular/core/testing';

import { SharingUSerService } from './sharing-user.service';

describe('SharingUSerService', () => {
  let service: SharingUSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharingUSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
