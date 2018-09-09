import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FaqsComponent } from './faqs/faqs.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, FaqsComponent]
})
export class UiModule { }
