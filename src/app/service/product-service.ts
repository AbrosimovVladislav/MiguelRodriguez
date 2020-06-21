import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Product} from '../model/Product';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  aggregatorBasePath = environment.baseApiUrl + '8082';
  getProductsFromAggregatorPath = '/allProducts';
  createProductPath = '/product';

  constructor(private http: HttpClient) {
  }

  createProduct(model: string, brandShortName: string, typeShowName: string, age: string, description: string, srcImageLink: string) {
    console.log('we are in createProduct');
    return this.http
      .post<string>(this.aggregatorBasePath + this.createProductPath,
        {
          model,
          brandShortName,
          typeShowName,
          age,
          description,
          srcImageLink
        }
      );
  }

  getProducts() {
    console.log('we are in getProducts');
    return this.http
      .get<Product[]>(this.aggregatorBasePath + this.getProductsFromAggregatorPath)
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
