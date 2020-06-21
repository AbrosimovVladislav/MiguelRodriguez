import {Component, EventEmitter, OnInit} from '@angular/core';
import {Ticket} from '../../model/Ticket';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TicketService} from '../../service/ticket-service';

@Component({
  selector: 'app-ticket-catalogue',
  templateUrl: './ticket-catalogue.component.html',
  styleUrls: ['./ticket-catalogue.component.scss']
})
export class TicketCatalogueComponent implements OnInit {
  tickets: Ticket[] = [];
  statuses: any[] = [{label: 'NEW', value: 'NEW'}, {label: 'IN_PROGRESS', value: 'IN_PROGRESS'}, {label: 'RESOLVED', value: 'RESOLVED'}];


  constructor(private ticketService: TicketService, private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.ticketService.getTickets().subscribe(
      tickets => {
        this.tickets = tickets;
        console.log(this.tickets);
      }
    );
  }

  toDetails(event: EventEmitter<any>, id: string) {
    this.ticketService.setInProgress(id);
    this.router.navigate(['tt/tickets/' + id]);
  }
}
