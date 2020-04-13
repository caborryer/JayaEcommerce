import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/product/products.service';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../../models/products.interface';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/user.interface';

@Component({
  selector:'app-user',
  templateUrl:'./user.component.html',
  styles:[],
})
export class UserComponent implements OnInit {
  // public user: any = {};
  public products$: Observable<ProductsInterface[]>;

  constructor(public auth: AngularFireAuth,
              private authService: AuthService,
              private productsService: ProductsService) {
    //
    // this.auth.authState.subscribe(user => {
    //    console.log('from user profile ', user);
    //   if (!user) {
    //     return;
    //   }
    //   this.user.name = user.displayName;
    //   this.user.uid = user.uid;
    //   this.user.profileImage = user.photoURL;
    // });
  }
  user:UserInterface = {
    name: '',
    userImage: '',
  };

  ngOnInit(): void {
    this.products$ = this.productsService.getAllProducts();
  }

}
