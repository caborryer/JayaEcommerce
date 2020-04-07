import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/product/products.service';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public products$: Observable<ProductsInterface[]>

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.products$ = this.productsService.getAllProducts()
  }

}
