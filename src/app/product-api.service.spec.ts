import { TestBed } from '@angular/core/testing';

import { ProductApiService } from './product-api.service';

describe('ProductApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductApiService = TestBed.get(ProductApiService);
    expect(service).toBeTruthy();
  });
});
