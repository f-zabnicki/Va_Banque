import { TestBed } from '@angular/core/testing';

import { PlayerViewGuard } from './player-view.guard';

describe('PlayerViewGuard', () => {
  let guard: PlayerViewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlayerViewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
