import { TestBed } from '@angular/core/testing';

import { QuestionInGameService } from './question-in-game.service';

describe('QuestionInGameService', () => {
  let service: QuestionInGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionInGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
