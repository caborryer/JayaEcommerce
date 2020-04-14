import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';
import { ProductsService } from '../../service/product/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styles: []
})
export class EditProductComponent implements OnInit {
  private image: any;
  private imageOriginal: any;
  public products$: Observable<ProductsInterface[]>;
  public product$: Observable<ProductsInterface>;

  @Input() product: ProductsInterface;

  constructor(private route:ActivatedRoute,
              private productsService: ProductsService) { }

  public  editProductForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    units: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const idProduct = this.route.snapshot.params.id;
    this.product$ = this.productsService.getProduct(idProduct);
    this.products$ = this.productsService.getAllProducts();
    this.image = this.product.image;
    this.imageOriginal = this.product.image;
    this.initValuesForm();
  }

  editProduct(product : ProductsInterface){
    if (this.image === this.imageOriginal){
      product.image = this.imageOriginal;
      this.productsService.editProductById(product)
    } else {
      this.productsService.editProductById(product, this.image)
    }
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

  handleImage(event: any): void{
    this.image = event.target.files[0];
  }

  private initValuesForm(): void {
    this.editProductForm.patchValue({
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      units: this.product.units,
      price: this.product.price
    })
  }
}
