import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Ticket} from '../../model/Ticket';
import {HttpClient} from '@angular/common/http';
import {MatcherOffer} from '../../model/MatcherOffer';
import {ProductService} from '../../service/product-service';
import {Product} from '../../model/Product';
import {SelectItem} from 'primeng';
import {TypeService} from '../../service/type-service';
import {BrandService} from '../../service/brand-service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  ticket: Ticket;
  productsIds: SelectItem[] = [];
  selectedProductId: string;

  types: SelectItem[] = [];
  brands: SelectItem[] = [];
  ages: SelectItem[] = [{label: 'UNDEF', value: ''},
    {label: 'YTH', value: 'YTH'},
    {label: 'JR', value: 'JR'},
    {label: 'INT', value: 'INT'},
    {label: 'SR', value: 'SR'}];

  model: string;
  brandShortName: string;
  typeShowName: string;
  age: string;
  description: string;
  srcImageLink: string;

  constructor(private router: Router,
              private brandService: BrandService,
              private typeService: TypeService,
              private productService: ProductService,
              private httpClient: HttpClient,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(paramMap => this.getTicket(paramMap.get('id')));

    this.productService.getProducts().subscribe(
      products => {
        products.forEach((p: Product) => this.productsIds.push({label: p.productId, value: p.productId}));
        console.log(this.productsIds);
      }
    );

    this.getTypes();
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(brands => brands.forEach(t => this.brands.push({label: t.shortName, value: t.shortName})));
  }

  getTypes() {
    this.typeService.getTypes().subscribe(types => types.forEach(t => this.types.push({label: t.showName, value: t.showName})));
  }

  getTicket(id: string) {
    this.httpClient
      .get<Ticket>('http://localhost:8083/tickets/' + id)
      .subscribe(incomingTicket => this.ticket = incomingTicket);
  }

  resolveWithProductCreating() {
    this.productService.createProduct(this.model, this.brandShortName, this.typeShowName, this.age, this.description, this.srcImageLink)
      .subscribe(productId => this.resolve(productId));
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

    this.router.navigate(['tt/tickets/']);
  }
}
