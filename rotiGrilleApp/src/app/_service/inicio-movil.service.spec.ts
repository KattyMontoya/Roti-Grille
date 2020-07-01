import { TestBed } from '@angular/core/testing';

import { InicioMovilService } from './inicio-movil.service';

describe('InicioMovilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InicioMovilService = TestBed.get(InicioMovilService);
    expect(service).toBeTruthy();
  });
});
