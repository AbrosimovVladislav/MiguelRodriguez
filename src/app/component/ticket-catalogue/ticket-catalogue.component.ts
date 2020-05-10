import { Component, OnInit } from '@angular/core';
import {Ticket} from '../../model/Ticket';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ticket-catalogue',
  templateUrl: './ticket-catalogue.component.html',
  styleUrls: ['./ticket-catalogue.component.css']
})
export class TicketCatalogueComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<Ticket[]>('http://localhost:8083/tickets')
      .subscribe(ticks => {
        ticks.forEach(tick => this.tickets.push(tick));
      });
  }
}
