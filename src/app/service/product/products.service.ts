import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {ProductsInterface } from '../../models/products.interface';
import { FileInterface } from '../../models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';



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
  private productCollection: AngularFirestoreCollection<ProductsInterface>;
  private productsUrl = "products";
  private filePath: any;
  private url : Observable<string>;


  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) {
    this.productCollection = db.collection<ProductsInterface>('products');

  }

  public getAllProducts(): Observable <ProductsInterface[]>{
    return this.productCollection
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

  public deleteProductById(product: ProductsInterface){
    return this.productCollection.doc(product.id).delete();
  }

  public editProductById(product: ProductsInterface) {
    return this.productCollection.doc(product.id).update(product);
  }

  public newProduct(product: ProductsInterface) {

  }

   private  uploadImage(product:ProductsInterface, image: FileInterface) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.url = urlImage;
            console.log('URL_IMAGE', urlImage);
            console.log('PRODUCT', product);

          })
        })
      ).subscribe();


  }
}
