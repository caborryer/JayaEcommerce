import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {ProductsInterface } from '../../models/products.interface';
import { FileInterface } from '../../models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';



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
  public user: any = {};
  private productCollection: AngularFirestoreCollection<ProductsInterface>;
  private productsUrl = "products";
  private filePath: any;
  private url : Observable<string>;


  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage,
             public auth: AngularFireAuth) {
    this.productCollection = db.collection<ProductsInterface>('products');

    this.auth.authState.subscribe( user => {
      // console.log('Null state from Product: ', user);
      if (!user) {
        return;
      }
      this.user.name = user.displayName;
      this.user.uid = user.uid;
      this.user.profileImage = user.photoURL;
    });

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

  public editProductById(product: ProductsInterface, newImage?: FileInterface) {
    if (newImage) {
      this.uploadImage(product, newImage);
    } else {
      return this.productCollection.doc(product.id).update(product);
    }
  }

  public preAddAndUpdate(product: ProductsInterface, image: FileInterface): void{
    this.uploadImage(product, image);
  }

  private saveProduct(product: ProductsInterface){
    console.log('ProductService', product)
    const productObj= {
      name: product.name,
      description: product.description,
      units: product.units,
      price: product.price,
      seller: this.user.name,
      uid: this.user.uid,
      userImage: this.user.profileImage,
      image: this.url,
      fileRef: this.filePath,
    };
    if(product.id) {
      return this.productCollection.doc(product.id).update(productObj)
    } else {
      return this.productCollection.add(productObj)
    }
  }

   private uploadImage(product:ProductsInterface, image: FileInterface) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.url = urlImage;
            this.saveProduct(product);
          })
        })
      ).subscribe();


  }
}
