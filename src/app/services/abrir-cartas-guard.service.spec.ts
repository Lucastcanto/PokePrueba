import { TestBed } from '@angular/core/testing';

import { AbrirCartasGuardService } from './abrir-cartas-guard.service';

describe('AbrirCartasGuardService', () => {
  let service: AbrirCartasGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbrirCartasGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
