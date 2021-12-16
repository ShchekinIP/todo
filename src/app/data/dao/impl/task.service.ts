import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskDAO} from "../interface/TaskDAO";
import {Observable} from "rxjs";
import {Task} from "../../../model/Task";
import {TaskSearchValues} from "../search/SearchObjects";
import {Priority} from "../../../model/Priority";

@Injectable({
  providedIn: 'root'
})
export class TaskService implements TaskDAO{

  url = 'http://localhost:8080/task'

  constructor(private httpClient: HttpClient) { }

  add(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.url + '/add', task)
  }

  delete(id: number): Observable<Task> {
    return this.httpClient.delete<Task>(this.url + '/delete/' + id)
  }

  findAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url + '/all')
  }

  findById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this.url + '/id/' + id)
  }

  findTasks(taskSearchValues: TaskSearchValues): Observable<any> {
    return this.httpClient.post<Task[]>(this.url + '/search', taskSearchValues)
  }

  update(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.url + '/update', task)
  }


}
