import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { DetailsComponent } from './details/details.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'add',
    component: ProductAddComponent,
    data: { title: 'Add Product' }
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent,
    data: { title: 'Edit Product' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
