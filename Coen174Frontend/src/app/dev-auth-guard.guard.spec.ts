import { TestBed, async, inject } from '@angular/core/testing';

import { DevAuthGuardGuard } from './dev-auth-guard.guard';

describe('DevAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevAuthGuardGuard]
    });
  });

  it('should ...', inject([DevAuthGuardGuard], (guard: DevAuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
