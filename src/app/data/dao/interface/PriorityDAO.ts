import {Priority} from '../../../model/Priority';
import {CommonDAO} from './CommonDAO';
import {CategorySearchValues, PrioritySearchValues} from "../search/SearchObjects";
import {Observable} from "rxjs";


export interface PriorityDAO extends CommonDAO<Priority> {

    indPriorities(prioritySearchValues: PrioritySearchValues): Observable<any>;

}
