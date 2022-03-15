import { TestBed } from '@angular/core/testing';

import { AddEditQuestionsService } from './add-edit-questions.service';

describe('AddEditQuestionsService', () => {
  let service: AddEditQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEditQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
