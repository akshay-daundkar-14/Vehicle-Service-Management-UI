import { TestBed } from '@angular/core/testing';

import { AdminFunctionalitiesService } from './admin-functionalities.service';

describe('AdminFunctionalitiesService', () => {
  let service: AdminFunctionalitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFunctionalitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
