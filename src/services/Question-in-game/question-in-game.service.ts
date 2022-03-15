import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionInGameService {
  url = "http://localhost:7272";
  constructor(private http: HttpClient) { }
  httpOptions={
    headers: new HttpHeaders({"Content-Type":"application-json"}),
  };
  getQuestionsInGame(id: Guid): Observable<any> {
    return this.http.get(`${this.url}/api/QuestionsInGame`);
  }
  postQuestionInGame(id: Guid, correct: boolean): Observable<any> {
    return this.http.post(`${this.url}/api/QuestionsInGame`, {id, correct});
  }
  putQuestionInGame(id: Guid, correct: boolean): Observable<any> {
    console.log("Idzie w serwisie")
    console.log(correct);
    return this.http.put(`${this.url}/api/QuestionsInGame/?id=${id}`, correct);
  }
}
