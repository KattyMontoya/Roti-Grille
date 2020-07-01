import { TestBed } from '@angular/core/testing';

import { PedidosEntService } from './pedidosEnt.service';

describe('PedidosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidosEntService = TestBed.get(PedidosEntService);
    expect(service).toBeTruthy();
  });
});
