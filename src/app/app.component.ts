import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'>{{title}}</a>
        <ul class='nav nav-pills'>
          <li><a class='nav-link' routerLinkActive='active' [routerLink]="['']">Home</a></li>
          <li><a class='nav-link' [routerLink]="['/products']">Product List</a></li>
          <li><a class='nav-link' [routerLink]="['/add']">Add Product</a></li>
        </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product Mgmt System';
}