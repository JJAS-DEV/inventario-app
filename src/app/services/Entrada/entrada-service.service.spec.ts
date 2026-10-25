import { TestBed } from '@angular/core/testing';

import { EntradaServiceService } from './entrada-service.service';

describe('EntradaServiceService', () => {
  let service: EntradaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
