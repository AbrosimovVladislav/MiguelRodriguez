import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/Product';
import {ProductService} from '../../service/product-service';

@Component({
  selector: 'app-product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    const url = 'http://localhost:8083/products';
    this.productService.getProducts(url).subscribe(
      products => {
        this.products = products;
        console.log(this.products);
      }
    );
  }
}
