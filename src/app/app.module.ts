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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TicketCatalogueComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    MenubarModule,
    RouterModule.forRoot(
      [
        {path: 'main', component: MainComponent},
        {path: 'ticket-catalogue', component: TicketCatalogueComponent}
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
