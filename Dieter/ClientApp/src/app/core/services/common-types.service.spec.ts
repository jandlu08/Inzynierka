import { TestBed } from '@angular/core/testing';

import { CommonTypesService } from './common-types.service';

describe('CommonTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonTypesService = TestBed.get(CommonTypesService);
    expect(service).toBeTruthy();
  });
});
