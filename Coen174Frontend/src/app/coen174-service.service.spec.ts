import { TestBed, inject } from '@angular/core/testing';

import { Coen174ServiceService } from './coen174-service.service';

describe('Coen174ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Coen174ServiceService]
    });
  });

  it('should be created', inject([Coen174ServiceService], (service: Coen174ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
