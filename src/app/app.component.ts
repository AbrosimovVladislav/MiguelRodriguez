import {Component} from '@angular/core';
import {MenuItem} from 'primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MiguelRodriguez';
  items: MenuItem[] = [
    {label: 'Main', url: 'tt/main'},
    {label: 'Ticket Catalogue', url: 'tt/tickets'},
    {label: 'Product Catalogue', url: 'tt/products'}
  ];
}
