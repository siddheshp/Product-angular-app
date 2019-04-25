import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductApiService } from '../product-api.service';
import { Product } from '../product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  Id: number = null;
  Name: string = '';
  Description: string = '';
  Price: number = null;
  CreatedDate: Date = new Date();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private api: ProductApiService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      Id: [null, Validators.required],
      Name: [null, Validators.required],
      Description: [null, Validators.required],
      Price: [null, Validators.required],
      CreatedDate: [null, Validators.required]
    });
  }

  getProduct(id) {
    this.api.getProductById(id).subscribe(data => {
      this.Id = data.Id;
      this.productForm.setValue({
        Id: data.Id,
        Name: data.Name,
        Description: data.Description,
        Price: data.Price,
        //CreatedDate: new Date(this.datePipe.transform(data.CreatedDate, 'yyyy-MM-dd'))
        CreatedDate: data.CreatedDate
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateProduct((form as unknown as Product).Id, form)
      .subscribe(res => {
        this.router.navigate(['/products']);
      }, (err) => {
        console.log(err);
      });
  }
}
