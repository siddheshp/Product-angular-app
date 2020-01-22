import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { ProductAddComponent } from './product-add/product-add.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AlertComponent } from './alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeaderDirective } from './ngbd-sortable-header.directive';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    DetailsComponent,
    ProductAddComponent,
    ProductEditComponent,
    AlertComponent,
    NgbdSortableHeaderDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule { }
