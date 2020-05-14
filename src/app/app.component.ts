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
    {label: 'Main', url: 'main', icon: 'pi pi-globe'},
    {label: 'Ticket Catalogue', url: 'tickets', icon: 'pi pi-ticket'},
    {label: 'Product Catalogue', url: 'products', icon: 'pi pi-id-card'}
  ];


}
