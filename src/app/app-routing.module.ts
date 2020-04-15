import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserComponent } from './components/user/user.component';
import { ProductComponent } from './components/addAndDeleteProduct/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AuthGuard } from './service/auth.guard';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'chat', canActivate: [AuthGuard],
  children: [
    { path: '', component: ChatComponent },
    { path: ':chatroomId', component: ChatComponent }
  ]
  },
  {path: 'products', component: MyProductsComponent, canActivate: [AuthGuard]},
  {path: 'productDetails/:id', component: ProductDetailComponent, canActivate: [AuthGuard]},
  {path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard]},
  {path: 'editProduct/:id', component: EditProductComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: UserComponent, canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
