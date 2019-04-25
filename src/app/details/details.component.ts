import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductApiService } from '../product-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute,
    private api: ProductApiService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.api.getProductById(id)
        .subscribe(product => this.product = product,
          err => console.log(err));
    }
  }

}
