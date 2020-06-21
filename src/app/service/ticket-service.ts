import {Ticket} from '../model/Ticket';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  basePath = environment.baseApiUrl + '8083';
  getTicketsPath = '/tickets';
  setInProgressPath = '/inProgress/';

  constructor(private http: HttpClient) {
  }

  setInProgress(id: string) {
    console.log('setInProgress ' + id);
    return this.http
      .get<Ticket>(this.basePath + this.setInProgressPath + id)
      .pipe(
        map(
          ticket => console.log(ticket)
        )
      ).subscribe();
  }

  getTickets() {
    console.log('we are in getProducts');
    return this.http
      .get<Ticket[]>(this.basePath + this.getTicketsPath)
      .pipe(
        map(tickets => {
          const ticketArray: Ticket[] = [];
          for (const key in tickets) {
            if (tickets.hasOwnProperty(key)) {
              ticketArray.push({
                id: tickets[key].id,
                scrapperOffer: tickets[key].scrapperOffer,
                productIds: tickets[key].productIds,
                createdTime: tickets[key].createdTime,
                status: tickets[key].status
              });
            }
          }
          return ticketArray;
        })
      );
  }

}
