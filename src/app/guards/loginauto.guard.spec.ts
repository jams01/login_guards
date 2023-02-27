import { TestBed } from '@angular/core/testing';

import { LoginautoGuard } from './loginauto.guard';

describe('LoginautoGuard', () => {
  let guard: LoginautoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginautoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
