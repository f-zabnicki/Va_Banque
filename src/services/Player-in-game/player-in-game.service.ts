import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerInGameService {

  url = "http://localhost:7272";
  constructor(private http: HttpClient) { }
  httpOptions={
    headers: new HttpHeaders({"Content-Type":"application-json"}),
  };
  putPlayerInGame(id: Guid, points: number): Observable<any> {
    console.log(id);
    console.log(points);
    var request = this.http.put(`${this.url}/api/PlayerInGame/?id=${id}`, points);
    console.log(request);
    return request;
  };
  putPlayerInDatabase(id: Guid, points: number):Observable<any>{
    return this.http.put(`${this.url}/api/PlayerInGame/?id=${id}`, points);
  };
}
