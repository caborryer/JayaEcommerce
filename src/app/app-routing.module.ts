import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserComponent } from './components/user/user.component';
import { ProductComponent } from './components/addAndDeleteProduct/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AuthGuard } from './service/auth.guard';
import { MyProductsComponent } from './components/my-products/my-products.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'messages', component: ChatComponent},
  {path: 'products', component: MyProductsComponent},
  {path: 'productDetails/:id', component: ProductDetailComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'profile', component: UserComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
