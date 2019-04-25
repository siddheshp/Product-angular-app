import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Product } from '../product';
import { ProductApiService } from '../product-api.service';
import { Router } from '@angular/router';
import { SortEvent } from '../SortEvent';
import { compare, NgbdSortableHeaderDirective } from '../ngbd-sortable-header.directive';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  filteredProducts: Product[];
  products: Product[];

  _listFilterId = '';
  get listFilterId(): string {
    return this._listFilterId;
  }
  set listFilterId(value: string) {
    this._listFilterId = value;
    this.filteredProducts = this.listFilterId 
        ? this.performFilterId(this.listFilterId) : this.products;
  }

  _listFilterName = '';
  get listFilterName(): string {
    return this._listFilterName;
  }
  set listFilterName(value: string) {
    this._listFilterName = value;
    this.filteredProducts = this.listFilterName 
        ? this.performFilterName(this.listFilterName) : this.products;
  }

  _listFilterDescription = '';
  get listFilterDescription(): string {
    return this._listFilterDescription;
  }
  set listFilterDescription(value: string) {
    this._listFilterDescription = value;
    this.filteredProducts = this._listFilterDescription 
        ? this.performFilterDescription(this._listFilterDescription) : this.products;
  }

  _listFilterPrice = '';
  get listFilterPrice(): string {
    return this._listFilterPrice;
  }
  set listFilterPrice(value: string) {
    this._listFilterPrice = value;
    this.filteredProducts = this._listFilterPrice 
        ? this.performFilterPrice(this._listFilterPrice) : this.products;
  }

  _listFilterCreatedDate = '';
  get listFilterCreatedDate(): string {
    return this._listFilterCreatedDate;
  }
  set listFilterCreatedDate(value: string) {
    this._listFilterCreatedDate = value;
    this.filteredProducts = this._listFilterCreatedDate 
        ? this.performFilterCreatedDate(this._listFilterCreatedDate) : this.products;
  }

  constructor(private api: ProductApiService) { }

  ngOnInit() {
    this.api.getProducts()
      .subscribe(products => {
        this.products = products;
        this.filteredProducts = products;
      },
        err => console.log(err));
  }

  deleteProduct(id: number) {
    console.log('delete ' + id);
    this.api.deleteProduct(id)
      .subscribe(res => {
        //this.router.navigate(['/products']);
      },
        err => console.log(err));
  }

  performFilterId(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.Id.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  
  performFilterName(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.Name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  performFilterDescription(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.Description.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  performFilterPrice(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.Price.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  performFilterCreatedDate(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.CreatedDate.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  @ViewChildren(NgbdSortableHeaderDirective) headers: 
        QueryList<NgbdSortableHeaderDirective>;

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting products
    if (direction === '') {
      
    } else {
      this.filteredProducts = this.filteredProducts.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}