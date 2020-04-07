import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';
import { ProductsService } from '../../service/product/products.service';

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

}
