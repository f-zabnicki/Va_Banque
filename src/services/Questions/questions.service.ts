import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient} from "@angular/common/http";
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

    deleteQuestion(id: string) {
        return this.http.delete(`${this.url}/api/Question/${id}`);
    }
}