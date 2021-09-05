import { TestBed } from '@angular/core/testing';

import { SupplierlistingService } from './supplierlisting.service';

describe('SupplierlistingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierlistingService = TestBed.get(SupplierlistingService);
    expect(service).toBeTruthy();
  });
});
