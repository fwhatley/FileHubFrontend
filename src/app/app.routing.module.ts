import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaqsComponent } from './views/faqs/faqs.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {FileDetailsComponent} from './views/dashboard/file.details/file.details.component';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'file/:id', component: FileDetailsComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
