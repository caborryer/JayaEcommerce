import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';
import { ProductsService } from '../../service/product/products.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styles: []
})
export class MyProductsComponent implements OnInit {

  public products$: Observable<ProductsInterface[]>

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.products$ = this.productsService.getAllProducts()
  }

  deleteProduct(product: ProductsInterface){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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

  editProduct(product: ProductsInterface) {


  }


}
