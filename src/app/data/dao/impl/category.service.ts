import { Injectable } from '@angular/core';
import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../../model/Category";
import {Observable} from "rxjs";
import {CategorySearchValues} from "../search/SearchObjects";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements CategoryDAO{

  url = 'http://localhost:8080/category'

  constructor(private httpClient: HttpClient) { }

  add(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.url + '/add', category)
  }

  delete(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(this.url + '/delete/' + id)
  }

  findCategories(categorySearchValues: CategorySearchValues): Observable<any> {
    return this.httpClient.post<Category[]>(this.url + '/search', categorySearchValues)
  }

  findById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.url + '/id/' + id)
  }

  findAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url + '/all')
  }

  update(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.url + '/update', category)
  }
}
