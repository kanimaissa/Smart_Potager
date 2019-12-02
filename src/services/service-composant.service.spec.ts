import { TestBed } from '@angular/core/testing';

import { ServiceComposantService } from './service-composant.service';

describe('ServiceComposantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceComposantService = TestBed.get(ServiceComposantService);
    expect(service).toBeTruthy();
  });
});
