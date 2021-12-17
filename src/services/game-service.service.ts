import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { Game } from 'src/models/Game';
import { GameToCreateData } from 'src/models/GameToCreateData';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url = "http://localhost:7272";
  constructor(private http: HttpClient) { }
  httpOptions={
    headers: new HttpHeaders({"Content-Type":"application-json"}),
  };
  getGame(id: Guid): Observable<any> {
    return this.http.get(`${this.url}/api/Game/${id}`);
  }
  
  postGame(game: GameToCreateData): Observable<any> {
    return this.http.post(`${this.url}/api/Game`, game);
  }
  finishGame(id: Guid): Observable<any>{
    console.log(id);
    return this.http.put(`${this.url}/api/Game/${id}`, true);
  }
}