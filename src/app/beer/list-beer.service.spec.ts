import { TestBed } from '@angular/core/testing';

import { ListBeerService } from './list-beer.service';

describe('ListBeerService', () => {
  let service: ListBeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListBeerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
