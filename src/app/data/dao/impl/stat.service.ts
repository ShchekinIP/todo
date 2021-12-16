import { Injectable } from '@angular/core';
import {StatDao} from "../interface/StatDao";
import {Observable} from "rxjs";
import {Stat} from "../../../model/Stat";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatService implements StatDao{

  url = 'http://localhost:8080/stat'

  constructor(private httpClient: HttpClient) { }

  getOverallStat(): Observable<Stat> {
    return this.httpClient.get<Stat>(this.url)
  }
}
