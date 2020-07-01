import { TestBed } from '@angular/core/testing';

import { SugerenciasService } from './sugerencias.service';

describe('SugerenciasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SugerenciasService = TestBed.get(SugerenciasService);
    expect(service).toBeTruthy();
  });
});
