import {Component, EventEmitter, OnInit} from '@angular/core';
import {Ticket} from '../../model/Ticket';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TicketService} from '../../service/ticket-service';

@Component({
  selector: 'app-ticket-catalogue',
  templateUrl: './ticket-catalogue.component.html',
  styleUrls: ['./ticket-catalogue.component.css']
})
export class TicketCatalogueComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService, private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit() {
    const url = 'http://localhost:8083/tickets';
    this.ticketService.getTickets(url).subscribe(
      tickets => {
        this.tickets = tickets;
        console.log(this.tickets);
      }
    );
  }

  toDetails(event: EventEmitter<any>, id: string) {
    this.router.navigate(['/tickets/' + id]);
  }
}
