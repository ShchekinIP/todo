import {Task} from '../../../model/Task';
import {Category} from '../../../model/Category';
import {CommonDAO} from './CommonDAO';
import {Priority} from '../../../model/Priority';
import {Observable} from 'rxjs';
import {TaskSearchValues} from "../search/SearchObjects";


export interface TaskDAO extends CommonDAO<Task> {


    findTasks(taskSearchValues: TaskSearchValues): Observable<any>;




}
