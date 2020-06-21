import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MainComponent} from './component/main/main.component';
import {HttpClientModule} from '@angular/common/http';
import {TicketCatalogueComponent} from './component/ticket-catalogue/ticket-catalogue.component';
import {MenubarModule} from 'primeng/menubar';
import {RouterModule} from '@angular/router';
import {ProductComponent} from './component/product-component/product.component';
import {TicketDetailsComponent} from './component/ticket-details/ticket-details.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule, InputTextModule} from 'primeng';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TicketCatalogueComponent,
    ProductComponent,
    TicketDetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    MenubarModule,
    RouterModule.forRoot(
      [
        {path: 'tt/main', component: MainComponent},
        {path: 'tt/tickets', component: TicketCatalogueComponent},
        {path: 'tt/tickets/:id', component: TicketDetailsComponent},
        {path: 'tt/products', component: ProductComponent}
      ]
    ),
    InputTextModule,
    DropdownModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
