import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/product/products.service';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';
import { AuthService } from '../../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/user.interface';

@Component({
  selector:'app-user',
  templateUrl:'./user.component.html',
  styles:[],
})
export class UserComponent implements OnInit {
  public products$: Observable<ProductsInterface[]>;

  constructor(public auth: AngularFireAuth,
              private authService: AuthService,
              private productsService: ProductsService) {
  }
  user:UserInterface = {
    name: '',
    userImage: '',
  };
  public providerId: string = 'null';

  ngOnInit(): void {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.userImage = user.photoURL;
        this.providerId = user.providerData[0].providerId;
        console.log('USER', this.providerId);
      }
    })
    this.products$ = this.productsService.getAllProducts();
  }

}
