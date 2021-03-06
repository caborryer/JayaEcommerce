import { Component, OnInit, Input } from '@angular/core';
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
  private image: any;
  public product$: Observable<ProductsInterface>;
  public products$: Observable<ProductsInterface[]>;

  @Input() product: ProductsInterface


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
    console.log('New addAndDeleteProduct', data)
    this.productsService.preAddAndUpdate(data, this.image)
  }

  handleImage(event: any): void{
    this.image = event.target.files[0];
  }

  deleteProduct(product: ProductsInterface){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.productsService.deleteProductById(product).then(() => {
          Swal.fire('Deleted', 'Your addAndDeleteProduct has been deleted.', 'success')
        }) .catch((error) => {
          Swal.fire('Error!', 'There was an error deleting this addAndDeleteProduct', 'error')
        });

      }
    })
  }

}
