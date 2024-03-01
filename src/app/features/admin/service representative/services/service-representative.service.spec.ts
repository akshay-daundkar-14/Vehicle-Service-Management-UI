import { TestBed } from '@angular/core/testing';

import { ServiceRepresentativeService } from './service-representative.service';

describe('ServiceRepresentativeService', () => {
  let service: ServiceRepresentativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRepresentativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
