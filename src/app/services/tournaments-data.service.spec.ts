import { TestBed } from '@angular/core/testing';

import { TournamentsDataService } from './tournaments-data.service';

describe('TournamentsDataService', () => {
  let service: TournamentsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
