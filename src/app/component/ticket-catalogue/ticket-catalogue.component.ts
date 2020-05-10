import {Component, EventEmitter, OnInit} from '@angular/core';
import {Ticket} from '../../model/Ticket';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ticket-catalogue',
  templateUrl: './ticket-catalogue.component.html',
  styleUrls: ['./ticket-catalogue.component.css']
})
export class TicketCatalogueComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.httpClient.get<Ticket[]>('http://localhost:8083/tickets')
      .subscribe(ticks => {
        ticks.forEach(tick => this.tickets.push(tick));
      });
  }

  toDetails(event: EventEmitter<any>, id: string) {
    this.router.navigate(['/tickets/' + id]);
  }
}
