import { TestBed } from '@angular/core/testing';

import { PublicidadService } from './publicidad.service';

describe('PublicidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicidadService = TestBed.get(PublicidadService);
    expect(service).toBeTruthy();
  });
});
