import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Product} from '../model/Product';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  aggregatorBasePath = 'http://localhost:8082';
  getProductsFromAggregatorPath = '/allProducts';
  createProductPath = '/product';

  constructor(private http: HttpClient) {
  }

  createProduct(model: string, brandShortName: string, typeShowName: string, age: string, description: string, srcImageLink: string) {
    console.log('we are in createProduct');
    return this.http
      .post<string>(this.aggregatorBasePath + this.createProductPath,
        {
          model: model,
          brandShortName: brandShortName,
          typeShowName: typeShowName,
          age: age,
          description: description,
          srcImageLink: srcImageLink
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
