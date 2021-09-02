

import {Observable} from 'rxjs';


export interface CommonDAO<T> {


    getAll(): Observable<T[]>;


    get(id: number): Observable<T>;


    update(T): Observable<T>;

    // удалить значение
    delete(id: number): Observable<T>;


    add(T): Observable<T>;

}
