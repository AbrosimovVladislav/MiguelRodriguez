import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Ticket} from '../../model/Ticket';
import {HttpClient} from '@angular/common/http';
import {MatcherOffer} from '../../model/MatcherOffer';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  ticket: Ticket;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(paramMap => this.getTicket(paramMap.get('id')));
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
