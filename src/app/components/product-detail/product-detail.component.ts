import { Component, OnInit } from '@angular/core';
import { BuyService, BuyItem } from '../../service/buy/buy.service';
import { ProductsService, Product } from '../../service/product/products.service';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {
  product:Product;
  cartItem:BuyItem;
  public product$: Observable<ProductsInterface>;

  get quantity(): number {
    return this.cartItem ? this.cartItem.count : 0;
  }

  get amount(): number {
    return this.cartItem ? this.cartItem.amount : 0;
  }

  constructor(private route: ActivatedRoute,
              private buyService: BuyService,
              private productsService: ProductsService) { }

  ngOnInit(): void {
    const idProduct = this.route.snapshot.params.id;
    this.product$ = this.productsService.getProduct(idProduct);
    // this.route
    //   .params
    //   .subscribe(params => {
    //     // Get the addAndDeleteProduct id
    //     let id: string = params["id"];
    //     // Return the addAndDeleteProduct from ProductService
    //     this.productService.getProduct(id).subscribe((addAndDeleteProduct: Product) => this.addAndDeleteProduct = addAndDeleteProduct);
    //     // Return the cart item
    //     this.cartItem = this.cartService.findItem(id);
    //   });
  }

  addToCart() {
    this.cartItem = this.buyService.addProduct(this.product);
  }

  removeFromCart() {
    this.cartItem = this.buyService.removeProduct(this.product);
  }

}
