import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/product/products.service';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  public product$: Observable<ProductsInterface>;
  public products$: Observable<ProductsInterface[]>

  constructor(private productsService:ProductsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.products$ = this.productsService.getAllProducts()
    const id = this.route.snapshot.params.id;
    this.product$ = this.productsService.getProduct(id);
  }

}
