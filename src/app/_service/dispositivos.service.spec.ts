import { TestBed } from '@angular/core/testing';

import { DispositivosService } from './dispositivos.service';

describe('DispositivosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispositivosService = TestBed.get(DispositivosService);
    expect(service).toBeTruthy();
  });
});
