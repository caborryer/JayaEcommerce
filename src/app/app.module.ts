import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProductComponent } from './components/addAndDeleteProduct/product.component';
import { UserComponent } from './components/user/user.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

// Forms
import { FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

// Virtual scroll
import { ScrollingModule} from '@angular/cdk/scrolling';

// Firebase

import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule, BUCKET} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';

// Service
import { ChatService } from './service/chat/chat.service';
import { EditProductComponent } from './components/edit-product/edit-product.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CarouselComponent,
    ChatComponent,
    ProductComponent,
    UserComponent,
    MyProductsComponent,
    ProductDetailComponent,
    EditProductComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,

  ],
  providers: [
    {provide: BUCKET, useValue: 'gs://jayaecommerce-a8600.appspot.com'},
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
