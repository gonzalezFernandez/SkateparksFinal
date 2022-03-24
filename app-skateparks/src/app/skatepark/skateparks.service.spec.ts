import { TestBed } from '@angular/core/testing';

import { SkateparkService } from './skateparks.service';

describe('SkateparksService', () => {
  let service: SkateparkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkateparkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
