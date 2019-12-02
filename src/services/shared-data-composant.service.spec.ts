import { TestBed } from '@angular/core/testing';

import { SharedDataComposantService } from './shared-data-composant.service';

describe('SharedDataComposantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedDataComposantService = TestBed.get(SharedDataComposantService);
    expect(service).toBeTruthy();
  });
});
