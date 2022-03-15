import { TestBed } from '@angular/core/testing';

import { PlayerInGameService } from './player-in-game.service';

describe('PlayerInGameService', () => {
  let service: PlayerInGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerInGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
