import {Ticket} from '../model/Ticket';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

  getTickets(url: string) {
    console.log('we are in getProducts');
    return this.http
      .get<Ticket[]>(url)
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
                inProgress: tickets[key].inProgress,
                resolved: tickets[key].resolved
              });
            }
          }
          return ticketArray;
        })
      );
  }

}
