import { TestBed, async, inject } from '@angular/core/testing';
import { LandingpageGuard } from './landingpage.guard';
import { configureTestSuite } from '@sunbird/test-util';

describe('LandingpageGuard', () => {
  configureTestSuite();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandingpageGuard]
    });
  });

  it('should ...', inject([LandingpageGuard], (guard: LandingpageGuard) => {
    const res = guard.canActivate(null, null);
    expect(guard).toBeTruthy();
    expect(res).toEqual(true);
  }));

  it('should replace window location', inject([LandingpageGuard], (guard: LandingpageGuard) => {
    document.body.innerHTML = document.body.innerHTML +
      '<input id="defaultTenantIndexStatus" value="true" type="hidden" />';
    const res = guard.canActivate(null, null);
    expect(res).toEqual(false);
  }));
});
