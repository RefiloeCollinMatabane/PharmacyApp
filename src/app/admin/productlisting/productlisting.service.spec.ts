import { TestBed } from '@angular/core/testing';

import { ProductlistingService } from './productlisting.service';

describe('ProductlistingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductlistingService = TestBed.get(ProductlistingService);
    expect(service).toBeTruthy();
  });
});
