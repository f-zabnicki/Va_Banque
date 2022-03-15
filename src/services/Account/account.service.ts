import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { Credentials } from 'src/models/Credentials';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url = "http://localhost:7272/api";

  constructor(private http: HttpClient) { }
  httpOptions={
    headers: new HttpHeaders({"Content-Type":"application-json"}),
  };
  login(credentials: Credentials): Observable<any>{
    return this.http.post(`${this.url}/Account`,credentials);
  }
  logOut(id:Guid): Observable<any>{
    console.log(id);
    return this.http.post(`${this.url}/Account/logout`,id);
  }
  getAccountDetaills(id:Guid): Observable<any>{
    return this.http.get(`${this.url}/Account/${id}`);
  }
}