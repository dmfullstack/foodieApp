import { TestBed, inject } from '@angular/core/testing';

import { RestaurantLocalService } from './restaurant-local.service';

describe('RestaurantLocalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantLocalService]
    });
  });

  it('should be created', inject([RestaurantLocalService], (service: RestaurantLocalService) => {
    expect(service).toBeTruthy();
  }));
});
