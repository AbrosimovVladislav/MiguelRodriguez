import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Product} from '../model/Product';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(url: string) {
    console.log('we are in getProducts');
    return this.http
      .get<Product[]>(url)
      .pipe(
        map(products => {
          const productArray: Product[] = [];
          for (const key in products) {
            if (products.hasOwnProperty(key)) {
              productArray.push({
                productId: products[key].productId,
                model: products[key].model,
                brand: products[key].brand,
                type: products[key].type,
                age: products[key].age
              });
            }
          }
          return productArray;
        })
      );
  }

}
