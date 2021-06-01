import { TestBed } from '@angular/core/testing';

import { GrpService } from './grp.service';

describe('GrpService', () => {
  let service: GrpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
