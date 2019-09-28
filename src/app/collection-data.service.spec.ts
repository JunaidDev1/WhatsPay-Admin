import { TestBed, inject } from '@angular/core/testing';

import { CollectionDataService } from './collection-data.service';

describe('CollectionDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionDataService]
    });
  });

  it('should be created', inject([CollectionDataService], (service: CollectionDataService) => {
    expect(service).toBeTruthy();
  }));
});
