import { TestBed } from '@angular/core/testing';

import { AboutAdminService } from './about-admin.service';

describe('AboutAdminService', () => {
  let service: AboutAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
