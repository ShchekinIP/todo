import { Injectable } from '@angular/core';
import {PriorityDAO} from "../interface/PriorityDAO";
import {Priority} from "../../../model/Priority";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {PrioritySearchValues} from "../search/SearchObjects";

@Injectable({
  providedIn: 'root'
})
export class PriorityService implements PriorityDAO{

  url = 'http://localhost:8080/priority'

  constructor(private httpClient: HttpClient) { }

  add(priority: Priority): Observable<Priority> {
    return this.httpClient.post<Priority>(this.url + '/add', priority)
  }

  delete(id: number): Observable<Priority> {
    return this.httpClient.delete<Priority>(this.url + '/delete/' + id)
  }

  findById(id: number): Observable<Priority> {
    return this.httpClient.get<Priority>(this.url + '/id/' + id)
  }

  findAll(): Observable<Priority[]> {
    return this.httpClient.get<Priority[]>(this.url + '/all')
  }

  indPriorities(prioritySearchValues: PrioritySearchValues): Observable<any> {
    return this.httpClient.post<Priority[]>(this.url + '/search', prioritySearchValues)
  }

  update(priority: Priority): Observable<Priority> {
    return this.httpClient.put<Priority>(this.url + '/update', priority)
  }
}
