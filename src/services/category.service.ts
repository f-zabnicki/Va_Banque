import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, Subject } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "http://localhost:7272/api";
  updateListOfCategories$: Subject<Category> = new Subject<Category>();
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application-json" }),
  };
  getCategory(id: Guid): Observable<any> {
    // typo
    return this.http.get(`${this.url}/category/${id}`);
  }
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.url}/category`);
  }
  addCategory(category: Category): Observable<any> {
    return this.http.post(`${this.url}/category`, category);
  }
  updateView(category: Category) {
    this.updateListOfCategories$.next(category);
  }
  remove(id: Guid): Observable<any> {
    return this.http.delete(`${this.url}/category/${id}`);
  }
}
