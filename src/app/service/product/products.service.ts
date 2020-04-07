import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import {ProductsInterface } from '../../models/products.interface';


export interface Product {
  id: string;
  name: string;
  price: number;
  imageS: string;
  imageL: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = "products";


  constructor(private db: AngularFirestore) { }

  public getAllProducts(): Observable <ProductsInterface[]>{
    return this.db.collection('products')
      .snapshotChanges()
      .pipe(
        map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as ProductsInterface;
          const id = a.payload.doc.id;
          return { id, ...data}
        }))
      )
  }

  public getProduct(id : ProductsInterface): Observable<ProductsInterface>{
    return this.db.doc<ProductsInterface>(`products/${id}`).valueChanges();
  }
}
