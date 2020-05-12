import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Type} from '../model/Type';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  ttBasePath = 'http://localhost:8083';
  getTypesPath = '/types';

  constructor(private http: HttpClient) {
  }

  getTypes(): Observable<Type[]> {
    console.log('we are in getTypes');
    return this.http
      .get<Type[]>(this.ttBasePath + this.getTypesPath)
      .pipe(
        map(types => {
          const typeArr: Type[] = [];
          for (const key in types) {
            if (types.hasOwnProperty(key)) {
              typeArr.push({
                showName: types[key].showName
              });
            }
          }
          return typeArr;
        })
      );
  }

}
