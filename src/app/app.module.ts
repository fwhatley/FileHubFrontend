import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import { DevToolsComponent } from './dev-tools/dev-tools.component';

@NgModule({
  declarations: [ // app modules
    AppComponent,
    DashboardComponent,
    FaqsComponent,
    HeaderComponent,
    FooterComponent,
    MessagesComponent,
    DevToolsComponent
  ],
  imports: [ // third party modules, including angulars
    BrowserModule,
    AppRoutingModule,
    // for http requests with rxjs: https://stackoverflow.com/questions/47369850/property-get-does-not-exist-on-type-httpclientmodule
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
