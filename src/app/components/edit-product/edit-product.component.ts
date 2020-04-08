import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';
import { ProductsService } from '../../service/product/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styles: []
})
export class EditProductComponent implements OnInit {
  private image: any;
  private imageOriginal: any;
  public products$: Observable<ProductsInterface[]>;

  @Input() product: ProductsInterface;

  constructor(private productsService: ProductsService) { }

  public  editProductForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    units: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.products$ = this.productsService.getAllProducts();
    this.image = this.product.image;
    this.imageOriginal = this.product.image;
    this.initValuesForm();
  }

  editProduct(product : ProductsInterface){
    console.log('Img', this.image);
    console.log('original', this.imageOriginal);
    if (this.image === this.imageOriginal){
      product.image = this.imageOriginal;
      this.productsService.editProductById(product);
    } else {
      this.productsService.editProductById(product, this.image)

    }
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
