import {CommonDAO} from "./CommonDAO";
import {Stat} from "../../../model/Stat";
import {CategorySearchValues} from "../search/SearchObjects";
import {Observable} from "rxjs";

export interface StatDao{

    getOverallStat(): Observable<Stat>

}
