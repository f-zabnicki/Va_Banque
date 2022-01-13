import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { Player } from 'src/models/Player';
import { Guid } from 'guid-typescript';
import { Credentials } from 'src/models/Credentials';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = "http://localhost:7272/api";
  updateListOfUsers$: Subject<Player> = new Subject<Player>();
  constructor(private http: HttpClient) { }
  httpOptions={
    headers: new HttpHeaders({"Content-Type":"application-json"}),
  };
  getUser(id: Guid): Observable<any> {
    // typo
    return this.http.get(`${this.url}/player/${id}`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.url}/player`);
  }
  addUser(user: Player): Observable<any> {
    return this.http.post(`${this.url}/player`, user);
  }
  updateView(user: Player) {
    this.updateListOfUsers$.next(user);
  }
  remove(id: Guid): Observable<any> {
    return this.http.delete(`${this.url}/player/${id}`);
  }
  login(credentials: Credentials): Observable<any>{
    return this.http.post(`${this.url}/player/login`, credentials);
  }
}
