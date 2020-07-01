import { TestBed } from '@angular/core/testing';

import { ReporteServiceService } from './reporte-service.service';

describe('ReporteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteServiceService = TestBed.get(ReporteServiceService);
    expect(service).toBeTruthy();
  });
});
