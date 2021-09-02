import {Category} from '../../../model/Category';
import {CommonDAO} from './CommonDAO';
import {Observable} from 'rxjs';


export interface CategoryDAO extends CommonDAO<Category> {


    search(title: string): Observable<Category[]>;

}
