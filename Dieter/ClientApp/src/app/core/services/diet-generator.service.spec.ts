import { TestBed } from '@angular/core/testing';

import { DietGeneratorService } from './diet-generator.service';

describe('DietGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DietGeneratorService = TestBed.get(DietGeneratorService);
    expect(service).toBeTruthy();
  });
});
