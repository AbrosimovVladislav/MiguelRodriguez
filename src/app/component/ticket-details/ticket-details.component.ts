import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Ticket} from '../../model/Ticket';
import {HttpClient} from '@angular/common/http';
import {MatcherOffer} from '../../model/MatcherOffer';
import {ProductService} from '../../service/product-service';
import {Product} from '../../model/Product';
import {SelectItem} from 'primeng';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  ticket: Ticket;
  productsIds: SelectItem[] = [];
  selectedProductId: string;

  constructor(private productService: ProductService, private httpClient: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(paramMap => this.getTicket(paramMap.get('id')));

    const url = 'http://localhost:8083/products';
    this.productService.getProducts(url).subscribe(
      products => {
        products.forEach((p: Product) => this.productsIds.push({label: p.productId, value: p.productId}));
        console.log(this.productsIds);
      }
    );
  }

  getTicket(id: string) {
    this.httpClient
      .get<Ticket>('http://localhost:8083/tickets/' + id)
      .subscribe(incomingTicket => this.ticket = incomingTicket);
  }

  resolve(productId: string) {
    const matcherOffer: MatcherOffer = new MatcherOffer();
    matcherOffer.productId = productId;
    matcherOffer.name = this.ticket.scrapperOffer.name;
    matcherOffer.shop = this.ticket.scrapperOffer.shopName;
    matcherOffer.brand = this.ticket.scrapperOffer.brand;
    matcherOffer.age = this.ticket.scrapperOffer.age;
    matcherOffer.type = this.ticket.scrapperOffer.type;

    this.httpClient
      .get<Ticket>('http://localhost:8083/resolveTicket?ticketId=' + this.ticket.id
        + '&name=' + matcherOffer.name
        + '&productId=' + matcherOffer.productId
        + '&shop=' + matcherOffer.shop
        + '&brand=' + matcherOffer.brand
        + '&age=' + matcherOffer.age
        + '&type.showName=' + matcherOffer.type.showName)
      .subscribe(incomingTicket => console.log(incomingTicket));
  }
}
