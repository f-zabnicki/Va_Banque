import { Question } from '../models/Question';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { QuestionTest } from 'src/models/questionTest';

@Injectable({
  providedIn: 'root'
})
export class AddEditQuestionsService {
  url = "http://localhost:7272/api";
  updateListOfQuestions$: Subject<Question> = new Subject<Question>();
  constructor(private http: HttpClient) { }
  httpOptions={
    headers: new HttpHeaders({"Content-Type":"application-json"}),
  };
  addQuestion(question: QuestionTest): Observable<any> {
    return this.http.post(`${this.url}/Question`, question);
  }
  getAllQuestions(): Observable<any> {
    return this.http.get(`${this.url}/Question`);
  }
  editQuestion(question: QuestionTest, id: Guid): Observable<any> {
    return this.http.put(`${this.url}/Question/${id}`, question);
  }
  getQuestion(id: Guid): Observable<any> {
    return this.http.get(`${this.url}/Question/${id}`);
  }
  updateView(questions: Question) {
    this.updateListOfQuestions$.next(questions);
  }
}
