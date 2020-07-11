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
    {label: 'Главная', url: 'main'},
    {label: 'Каталог задач', url: 'tickets'},
    {label: 'Каталог товаров', url: 'products'}
  ];
}
