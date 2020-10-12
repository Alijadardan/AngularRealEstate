import { TestBed } from '@angular/core/testing';

import { ArticleAdminService } from './article-admin.service';

describe('ArticleAdminService', () => {
  let service: ArticleAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
