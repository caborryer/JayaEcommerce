import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';
import { ProductsService } from '../../service/product/products.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {
  public product$: Observable<ProductsInterface>;
  public products$: Observable<ProductsInterface[]>;


  constructor(private route: ActivatedRoute,
              private productsService: ProductsService) { }
              public  newProductForm = new FormGroup({
                name: new FormControl('', Validators.required),
                description: new FormControl('', Validators.required),
                image: new FormControl('', Validators.required),
                units: new FormControl('', Validators.required),
                price: new FormControl('', Validators.required),
              });

  ngOnInit(): void {
    this.products$ = this.productsService.getAllProducts();
    const idProduct = this.route.snapshot.params.id;
    this.product$ = this.productsService.getProduct(idProduct);
  }

  addNewProduct(data: ProductsInterface) {
    console.log('New product', data)

  }

  updateProduct( product: ProductsInterface) {
    Swal.fire({
      title: 'Wait',
      text: 'Saving information',
      icon: 'info',
    }).then(result => {
      if (result.value) {
        this.productsService.editProductById(product).then(() => {
          Swal.fire('Updated', 'Your product has been update.', 'success')
        }) .catch((error) => {
          Swal.fire('Error!', 'There was an error updating this product', 'error')
        });
      }
    });
  }


}
