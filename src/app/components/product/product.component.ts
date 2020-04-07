import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';
import { ProductsService } from '../../service/product/products.service';
import { ActivatedRoute } from '@angular/router';

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

  ngOnInit(): void {
    this.products$ = this.productsService.getAllProducts();
    const idProduct = this.route.snapshot.params.id;
    this.product$ = this.productsService.getProduct(idProduct);
  }

}
