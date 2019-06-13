import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FaqsComponent } from './views/faqs/faqs.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { MessagesComponent } from './views/dashboard/messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import { DevToolsComponent } from './views/dashboard/dev-tools/dev-tools.component';
import {FileDetailsComponent} from './views/dashboard/file.details/file.details.component';
import {AppRoutingModule} from './app.routing.module';

@NgModule({
  declarations: [ // app modules
    AppComponent,
    DashboardComponent,
    FaqsComponent,
    HeaderComponent,
    FooterComponent,
    MessagesComponent,
    DevToolsComponent,
    FileDetailsComponent
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
