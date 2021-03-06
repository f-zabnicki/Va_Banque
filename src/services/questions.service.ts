import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, share } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";

@Injectable({
  providedIn: "root",
})
export class QuestionsService {

    url = "http://localhost:7272";
    constructor(private http: HttpClient) {}

    getQuestions(): Observable<any> {
        var questions = this.http.get(`${this.url}/api/question`).pipe(
            catchError((error) => {
            console.log("error is intercepted");
            console.error(error);
            return throwError(error.message);
        }));
        return questions;
    }

    deleteQuestion(id: Guid) {
        return this.http.delete(`${this.url}/api/Question/${id}`);
    }
}