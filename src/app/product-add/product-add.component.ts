import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductApiService } from '../product-api.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  Name: string = '';
  Description: string = '';
  Price: number = null;
  CreatedDate: Date = new Date();

  constructor(private router: Router,
    private api: ProductApiService,
    private formBuilder: FormBuilder,
    private alert: AlertService) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      Name: [null, Validators.required],
      Description: [null, Validators.required],
      Price: [null, Validators.required],
      CreatedDate: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.addProduct(form)
      .subscribe(res => {
        this.alert.showDialog('Products', 'Product added successfully');
        // navigate to product list
        this.router.navigate(['/products']);
      }, (err) => {
        this.alert.showDialog('Products', 'Error :' + err);
        console.log(err);
      });
  }

}
