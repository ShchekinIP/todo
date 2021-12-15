import {Category} from '../../../model/Category';
import {CommonDAO} from './CommonDAO';
import {Observable} from 'rxjs';
import {CategorySearchValues} from "../search/SearchObjects";


export interface CategoryDAO extends CommonDAO<Category> {


    findCategories(categorySearchValues: CategorySearchValues): Observable<any>;

}
