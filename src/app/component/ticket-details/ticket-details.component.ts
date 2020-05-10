import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Ticket} from '../../model/Ticket';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  ticket: Ticket;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}

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
}
