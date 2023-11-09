import { TestBed } from '@angular/core/testing';

import { TransaccionGuardService } from './transaccion-guard.service';

describe('TransaccionGuardService', () => {
  let service: TransaccionGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaccionGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
