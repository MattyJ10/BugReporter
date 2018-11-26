import { TestBed, async, inject } from '@angular/core/testing';

import { ManagerAuthGuardGuard } from './manager-auth-guard.guard';

describe('ManagerAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerAuthGuardGuard]
    });
  });

  it('should ...', inject([ManagerAuthGuardGuard], (guard: ManagerAuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
