import { TestBed } from '@angular/core/testing';

import { BuscadoresrapidosService } from './buscadoresrapidos.service';

describe('BuscadoresrapidosService', () => {
  let service: BuscadoresrapidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscadoresrapidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
