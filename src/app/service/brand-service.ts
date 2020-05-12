import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Brand} from '../model/Brand';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  aggregatorBasePath = 'http://localhost:8082';
  getBrandsPath = '/brands';

  constructor(private http: HttpClient) {
  }

  getBrands(): Observable<Brand[]> {
    console.log('we are in getBrands');
    return this.http
      .get<Brand[]>(this.aggregatorBasePath + this.getBrandsPath)
      .pipe(
        map(brands => {
          const brandArr: Brand[] = [];
          for (const key in brands) {
            if (brands.hasOwnProperty(key)) {
              brandArr.push({
                shortName: brands[key].shortName
              });
            }
          }
          return brandArr;
        })
      );
  }

}
