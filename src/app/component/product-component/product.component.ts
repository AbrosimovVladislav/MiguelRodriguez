import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<Product[]>('http://localhost:8083/products')
      .subscribe(products => {
        products.forEach(product => this.products.push(product));
      });
  }
}
