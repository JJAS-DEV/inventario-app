import { TestBed } from '@angular/core/testing';

import { EventoEntradaSharingService } from './evento-entrada-sharing.service';

describe('EventoEntradaSharingService', () => {
  let service: EventoEntradaSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoEntradaSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
