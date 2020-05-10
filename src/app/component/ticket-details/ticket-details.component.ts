import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Ticket} from '../../model/Ticket';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  ticket: Ticket;
  navigated = false;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.route.params);
    this.route.params.forEach((params: Params) => {
      if (params['ticketID'] !== undefined) {
        const id: string = params['ticketID'];
        this.navigated = true;
        this.getTicket(id);
      } else {
        this.navigated = false;
        this.ticket = null;
      }
    });
  }

  getTicket(id: string) {
    this.httpClient.get<Ticket>('http://localhost:8083/tickets/' + id)
      .subscribe(inputTicket => {
        this.ticket = inputTicket;
      });
  }

}
